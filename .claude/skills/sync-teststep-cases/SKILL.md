---
name: sync-teststep-cases
description: Use when TestStep (RWA build step) source code has changed and test coverage in test-for-aone-ci needs to follow up — supplementing new cases or repairing broken ones. Covers change analysis workflow, the four-layer test system (TestStep unit tests / case.json E2E / backend-tests smoke / upload-fixtures), layer selection decision tree, and known untestable constraints. Triggers on "TestStep 改了，补一下 case"、"跟进 TestStep 新需求的测试"、"同步测试覆盖"、"修复失败的 case".
---

# TestStep 变更后同步补充/修复测试 case 的 skill

TestStep（`~/Projects/Projects2/TestStep`，云效流水线构建步骤）每次功能变更后，
本仓库 test-for-aone-ci 及 TestStep 自身的测试都要跟进。本 skill 定义**从"分析变更"到"验证通过"的完整跟进流程**。

> 只想加一条 case.json 用例、不涉及 TestStep 变更分析？用姊妹 skill `add-test-case`（case.json schema 与 fixture 约定的权威文档）。本 skill 是它的上游：先决定"测什么、在哪层测"，再落到具体层的操作。

## 0. 全局图景：四层测试体系

| 层 | 位置 | 测什么 | 运行方式 | 单 case 耗时 |
|---|---|---|---|---|
| ① TestStep 单元测试 | `TestStep/test/**/*.spec.ts` | Provider/工具函数逻辑，尤其是**需要凭据或外部服务的分支**（Gitee API、OSS 下载、git 命令、TS 工具） | `npx mocha -r ts-node/register --timeout 30000 test/**/*.spec.ts`（mocha + chai + sinon） | 毫秒~秒 |
| ② case.json E2E | 本仓库 `case.json` + fixture 目录 | TestStep 编排全流程（install/build/pack/deploy/quota）+ 云效流水线 + FC 真部署，**以日志字符串和最终状态断言** | Aone-CI 触发 `TestStep/blackBox/index.js` → 上传 step 产物 → 建云效流水线 → 逐 case 跑 | 分钟级 |
| ③ backend-tests smoke | 本仓库 `backend-tests/<fixture>/` + `meta.json` | framework-checker 生成物（start.mjs）**在本机真跑、HTTP 真响应** | `node TestStep/blackBox/backendTest/index.mjs [fixture-name]`（单机 loopback，fail-fast，先于流水线跑） | 秒级 |
| ④ upload-fixtures | 本仓库 `upload-fixtures/*.zip` | GitPlatform=upload（OSS 代码源）的端到端行为 | zip 需先上传到 **OSS public bucket**，case.json 里用 `ArtifactURL` 引用 | 分钟级（走②） |

**数据流关键点**：
- `TestStep/package.json` 的 `prebuild:blackBox` 会把本仓库 `backend-tests/` **镜像拷贝**到 `TestStep/blackBox/backendTest/fixtures/` — 改 backend-tests 后 TestStep 侧自动同步，无需手动拷。
- case.json 由 blackBox 通过 GitHub API 从 `esa-sp/test-for-aone-ci` main 分支**在线拉取**（`blackBox/github.js` 的 `getTestCases`）— case.json 改动必须 push 到 main 才对 CI 生效。
- case 的 `envs` 会覆盖 `blackBox/constants.js` 的 `defaultParams` — 看 defaultParams 才知道"不填时的默认值"（陷阱重灾区，见 §5）。

## 1. 触发场景

- TestStep 合入了新功能 / 新参数 / 新构建分支（如新增 GitPlatform、TS 预编译、FC handlers）
- TestStep 修改或删除了既有逻辑（**日志文本变了 → 既有 case 的 requireLogTextList 会静默失效**）
- CI 上某个 case 突然挂了，需要判断"case 过期"还是"TestStep 真有 bug"
- 定期巡检测试覆盖缺口

## 2. Step 1 — 变更分析（先搞清楚改了什么）

```bash
cd ~/Projects/Projects2/TestStep
git log --oneline -20                 # 找上次同步以来的提交
git diff --stat <last-synced-sha>     # 变更文件清单
git diff <last-synced-sha> -- src/    # 逐文件看实质变更
```

**按文件定位影响面**（TestStep 源码地图）：

| 变更文件 | 影响 | 通常需要跟进的层 |
|---|---|---|
| `src/params.ts` | 新增/删除 Step 输入参数 | ①（spec 里 `makeParams` 要同步补字段！）+ ② |
| `src/steps/build.ts` | 构建分支/日志文本（packBackendCode 五分支、TS 预编译、quota） | ②（新日志锚点）+ 可能 ③ |
| `src/steps/source.ts` | esa.jsonc 覆盖逻辑（applyEsaJsoncConfig） | ① + ② |
| `src/sources/*.ts` | 代码源 Provider（github/gitee/oss/local/factory） | ①（凭据类只能 mock）+ ②/④ |
| `src/git/command.ts` | GitClient 封装 | ① |
| `src/utils/*.ts` | 工具函数（ts.ts / nodeVersion.ts / fc.ts / sls.ts …） | ① |
| `src/erRest.ts` / `src/steps/version.ts` / `deploy.ts` | 平台 API 调用（hasLabel / createRWACodeVersion / htmlHandling） | 大多**不可直接测**（见 §7），个别可从②日志侧面验证 |
| `blackBox/**` | 测试框架本身 | 检查 defaultParams / flow.yaml 是否影响既有 case |

**变更分类 → 动作**：

1. **新增功能** → 补 case（走 §3 决策树）
2. **修改日志文本** → grep 本仓库 `case.json` 里所有 `requireLogTextList`，逐条对照 TestStep 源码里的当前日志字符串，修复漂移（§6）
3. **删除功能** → 删除/下线对应 case 和 spec（如 HEAD 上 webhook 注册被移除 → gitee.spec.ts 的 webhook 测试需同步清理）
4. **新增 IParams 字段** → **必须**同步更新所有 spec 文件里的 `makeParams`（否则 TS 编译报错或行为静默错误，实例：`GiteeSecret` 缺失曾导致 webhook 测试静默跳过）

## 3. Step 2 — 测试层决策树

```
这个变更能在云效流水线日志里观察到吗？
├─ 能（有明确的 logInfo/logSuccess/logStep 输出）
│   ├─ 依赖真实第三方凭据（Gitee token / GitAccountId）？
│   │   ├─ 是 → ① 单元测试 mock（凭据不进 CI）
│   │   └─ 否 → ② case.json E2E（首选，最贴近真实）
│   └─ 需要用户上传 zip（GitPlatform=upload）？
│       └─ 是 → ① 单测 + ④ upload-fixtures（zip 传 OSS public bucket）
├─ 不能（内部 API 调用、纯函数逻辑、透传字段）
│   ├─ 是纯函数/Provider 逻辑 → ① 单元测试
│   └─ 是平台 API 透传（htmlHandling / hasLabel …）→ 查 §7 不可测清单，
│       能间接验证就用 ② 的 notRequireLogTextList 侧面断言，否则记录为已知缺口
└─ 是 framework-checker 生成物的运行时行为（路由响应/静态文件/端口）？
    └─ ③ backend-tests fixture + meta.json
```

**多层并用是常态**：例如 OSS provider = ①单测（5 种内容分类 + 重试）+ ④集成（2 个真实 zip case）。

## 4. Step 3 — 各层操作要点

### 4.1 ①TestStep 单元测试

- 目录约定镜像 src：`test/sources/xxx.spec.ts` 测 `src/sources/xxx.ts`
- 标准模式（参考 `test/sources/gitee.spec.ts` / `oss.spec.ts`）：
  - `makeParams(overrides)`：返回**完整** IParams（所有字段都要有默认值），`...overrides` 结尾
  - `makeCtx(targetDir, params)`：返回完整 StepContext（对照 `src/context.ts`）
  - `beforeEach` 里 `fs.mkdtempSync(os.tmpdir())` 建临时目录；`afterEach` 里 `sinon.restore()` + `fs.rmSync`
  - 类方法用 `sinon.stub(GitClient.prototype, 'clone')`；模块函数用 `sinon.stub(giteeApi, 'createNewRepo')`；`execSync` 用 `sinon.stub(require('child_process'), 'execSync')`
- **已踩的坑**：
  - ❌ `sinon.useFakeTimers()` 与 async/await 重试逻辑**死锁**。带 `setTimeout` 退避的重试测试用**真实定时器 + 单测试超时**：`it('...', async function () { this.timeout(15000); ... })`
  - ❌ IDE 报 "找不到名称 describe/beforeEach" 是误报（mocha 全局注入），以 `npx mocha` 实跑为准
- 验证：`cd TestStep && npx mocha -r ts-node/register --timeout 30000 test/**/*.spec.ts`

### 4.2 ②case.json E2E

case.json schema、fixture 命名、step 日志锚点等 → **全部照 `add-test-case` skill 执行**。本 skill 只补充"变更跟进"特有的注意点：

- **requireLogTextList 必须逐字对照 TestStep 源码**。新功能的日志在 `src/steps/build.ts` 等文件里 grep 出来原样贴，不要凭记忆写。注意模板字符串里的变量部分要截断（如 `"FC handlers zip created:"` 保留冒号截断，后面是路径）。
- **defaultParams 陷阱**（`blackBox/constants.js`）：不在 envs 里显式覆盖的参数会用默认值 —— `BuildCommand: 'npm run build'`、`InstallCommand: 'bun install'`、`AssetsDirectory: 'dist'`、`GitPlatform: 'github'`。测后端/FC handlers/upload 场景时**必须显式置空**：`"InstallCommand": ""`, `"BuildCommand": ""`, `"AssetsDirectory": ""`, `"EREntry": ""`。
- **esa.jsonc 覆盖的不对称性**（`src/steps/source.ts` applyEsaJsoncConfig）：
  - `installCommand` 用 `!== undefined` 判断 → esa.jsonc 里显式 `""` **能**跳过安装
  - `buildCommand` 用 `!!` 判断 → esa.jsonc 里 `""` 是 falsy，**会回退到控制台参数**！所以 Provider 返回 `buildCommand: ''` 的场景（upload static 分类），case envs 里还得再显式 `"BuildCommand": ""`
- 新建 fixture 后：更新 `add-test-case` skill §6 的速查表 + fixture README 写清存在理由。

### 4.3 ③backend-tests fixture

- schema 权威文档：`backend-tests/README.md`（meta.json 全字段 + 断言规则 + spawn 模式）
- 新增 framework-checker 支持的框架/风格时：新建 `backend-tests/<framework-slug>-<flavor>/`，含 `package.json` + 入口 + `meta.json`（≥1 条 HTTP 断言）+ `public/` 演示页
- 本机验证：`cd TestStep && npm run build && node blackBox/backendTest/index.mjs <fixture-name>`（需先在 fixture 里 `npm install`）
- 注意 `runFixture.mjs` 依赖 TestStep `node_modules/@alife/framework-checker` — framework-checker 升级后先 `npm install` 再跑

### 4.4 ④upload-fixtures

- 目录约定：`upload-fixtures/<场景名>/`（源文件）+ `upload-fixtures/<场景名>.zip`（打包产物，`zip -r <场景名>.zip <场景名>/`）
- zip 内**保留顶层目录**可顺带测 OSS provider 的"单目录扁平化"逻辑
- zip 必须上传到 OSS public bucket 后，把真实 URL 填进 case 的 `ArtifactURL`（case.json 里的占位 URL 上线前要替换）
- OSS provider 五种内容分类（`src/sources/oss.ts` classifyContent）：single-js / single-html / source-code(有 package.json) / static-with-config(有 esa.jsonc) / static-plain — 每类至少一个单测；集成 case 挑代表性的 1-2 类即可

## 5. 修复既有 case（日志漂移检测法）

case 挂掉的第一嫌疑永远是**日志文本漂移**，按此流程排查：

1. 从 CI 报告拿到失败 case 的 `reason`（"不符合期望日志:XXX" / "不符合期望状态"）
2. 拿 XXX 去 TestStep 源码 grep：
   ```bash
   cd ~/Projects/Projects2/TestStep && grep -rn "<日志片段>" src/
   ```
   - grep 不到 → 日志文本被改/删了 → 找到新文本，更新 case
   - grep 得到 → 该路径没被走到 → 用 `git log -p` 查相关分支逻辑变更（可能是分支优先级/前置条件变了），必要时改 envs 或 fixture
3. 状态不符（SUCCESS↔FAIL 翻转）→ 通常是错误处理策略变更（如某错误从 throw 改为 warn 降级），确认是**预期行为变更**后改 requireStatus；若非预期 → 是 TestStep bug，报修而不是改 case
4. 修完在 PR 描述里注明"case 修复对应 TestStep 的 <commit sha>"，方便回溯

## 6. Step 4 — 验证 checklist

```bash
# 1. TestStep 单测全绿
cd ~/Projects/Projects2/TestStep
npx mocha -r ts-node/register --timeout 30000 test/**/*.spec.ts

# 2. case.json 是合法 JSON、case 数对
cd ~/Projects/Projects2/test-for-aone-ci
python3 -c "import json; d=json.load(open('case.json')); print(f'{len(d)} cases OK')"

# 3. 新 case 引用的 RootDirectory / fixture 真实存在
python3 -c "
import json, os
for c in json.load(open('case.json')):
    rd = c['envs'].get('RootDirectory','')
    if rd and rd != '/' and not os.path.isdir('.' + rd):
        print('MISSING fixture:', rd, '←', c['name'])
"

# 4. （若动了 backend-tests）本机 smoke
node ~/Projects/Projects2/TestStep/blackBox/backendTest/index.mjs

# 5. （若动了 upload-fixtures）确认 zip 已上传 OSS 且 URL 可公开访问
curl -sI "<ArtifactURL>" | head -1
```

- [ ] 单测全绿
- [ ] case.json 合法且 fixture 存在
- [ ] 新 case 的 requireLogTextList 逐条 grep 过 TestStep 源码原文
- [ ] envs 显式覆盖了所有会被 defaultParams 污染的参数
- [ ] 新 fixture 已更新 `add-test-case` skill §6 速查表 + 自带 README
- [ ] spec 文件的 makeParams 与 `src/params.ts` IParams 字段完全同步
- [ ] 删除的功能对应的 case/spec 已同步清理

## 7. 已知不可测清单（不要浪费时间硬测）

| 项 | 原因 | 替代策略 |
|---|---|---|
| hasLabel 反向 case（无标签 UID 静默跳过后端打包） | CI 的 `AliUid: '1322492686665608'` 在 defaultParams 里固定且已打标，无法换 UID | 正向已被所有后端 case 隐式覆盖；反向放弃 |
| Gitee 真实 E2E（clone / createRepo / push） | 需要真实 Gitee OAuth token，不进 CI | ① 单测 mock 全覆盖（`test/sources/gitee*.spec.ts`） |
| htmlHandling 等 createRWACodeVersion 透传字段 | 平台侧行为，构建日志不可见 | 依赖平台侧测试；本侧不断言 |
| deploy 阶段细节 | 依赖 FC 真实部署结果 | 只用 `<<LOG>>step|deployEnd<</LOG>>` / `notRequireLogTextList` 粗粒度断言 |
| Local provider（GitPlatform=local） | CI 上无本地目录场景 | 被开发者本地调试覆盖；单测可选 |

## 8. 反模式

- ❌ 凭记忆写 requireLogTextList —— 必须 grep 源码原文
- ❌ 测后端/upload 场景忘了显式置空 `BuildCommand`/`InstallCommand`（被 defaultParams 的 `npm run build`/`bun install` 污染，装不上依赖或构建报错）
- ❌ 新增 IParams 字段后只改 params.ts 不改 spec 的 makeParams（编译错误或 mock 静默失效）
- ❌ 用 fake timers 测带 setTimeout 退避的 async 重试（死锁）
- ❌ case 挂了不查原因直接改 requireStatus 为 FAIL（掩盖真 bug）
- ❌ 改 TestStep 日志文本时不同步修 case.json（下轮 CI 全线飘红才发现）
- ❌ 把需要凭据的场景硬塞进 case.json（凭据泄露风险 + CI 必挂）
