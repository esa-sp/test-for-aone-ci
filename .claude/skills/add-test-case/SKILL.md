---
name: add-test-case
description: Use when the user asks to add, modify, or design a test case for the TestStep CI test harness in test-for-aone-ci. Covers case.json schema, fixture project conventions, and how to decide between reusing or creating a fixture directory. Triggers on requests like "加个 case 测 X"、"添加测试用例"、"新建一个 fixture 仓库".
---

# 给 test-for-aone-ci 加测试 case 的 skill

这个仓库是 TestStep（云效流水线步骤脚本）的端到端测试床。每条 case 在 CI 上跑一遍 TestStep，按 `case.json` 里声明的"应有日志"和"最终状态"判断 pass/fail。

## 1. 仓库布局

```
test-for-aone-ci/
├── case.json                  ← 所有 case 的总表（一个 JSON array）
├── README.md                  ← 简介
├── ReactVite/                 ← 基线 fixture：标准 Vite + React + TS
├── ReactVite-<场景后缀>/       ← 各种变体 fixture（每个故意为某个场景而存在）
└── .claude/skills/add-test-case/SKILL.md   ← 本文档
```

**关键约定**：
- 一条 case 跑起来时会传入 `RootDirectory` 指向某个 fixture 子目录
- fixture 之间应当**只在被测维度上有差异**，其它都尽量保持基线一致，便于"对照"
- 命名 `ReactVite-<场景>` 是惯例，建议保留前缀；后缀用 kebab-case 描述场景特征

## 2. case.json 字段语义（必读）

```jsonc
{
  "name": "用例名（中文 OK，会显示在结果上）",
  "envs": {
    // 这些会作为环境变量注入给 TestStep（实际是 Step input 参数）
    // 完整可用参数列表见 TestStep/src/params.ts，常用见下文 §3
  },
  "repoName": "test-for-aone-ci",   // 待测仓库；自测就写本仓库；新建仓库填 ""
  "requireStatus": "SUCCESS",        // 期望最终状态：SUCCESS / FAIL / CANCEL；空串表示不校验
  "requireLogTextList": [
    "字符串 A",                       // log 里必须出现（支持正则）
    "<<LOG>>step|buildEnd<</LOG>>"   // step 标记，见 §4
  ],
  "notRequireLogTextList": [          // 可选，log 里禁止出现的字符串
    "<<LOG>>step|deploy<</LOG>>"
  ]
}
```

### 字段细节

| 字段 | 类型 | 说明 |
|---|---|---|
| `name` | string | 必填 |
| `envs` | object | 必填。值类型必须是 string；JSON 嵌套对象需手动序列化为字符串（见下面 EnvironmentVariables 例子） |
| `repoName` | string | 必填。`""` = 让 step 自己创新仓库（配合 `ERName: "$RANDOM"` 用） |
| `requireStatus` | "SUCCESS" \| "FAIL" \| "CANCEL" \| "" | `""` 表示不校验状态 |
| `requireLogTextList` | string[] | 数组里**所有**字符串都要在 log 里命中（AND 关系），支持正则字面量 |
| `notRequireLogTextList` | string[] | 可选，数组里**任一**字符串命中即判定失败 |

### `envs` 里的特殊值

- `"$RANDOM"` — 替换为随机字符串。配合 `TemplateName: "$RANDOM"` 时会随机选当前线上一个真实模板名
- 嵌套 JSON 必须**字符串化**：`"EnvironmentVariables": "{ \"k\": \"v\" }"`（注意双引号转义）
- 故意填错值用于"看错误处理"是合法用法（比如 `"EnvironmentVariables": "{"` 测非法 JSON 兜底）

## 3. envs 里常用参数清单（高频）

按 case.json 现有用例归纳：

| 参数 | 取值范例 | 用来测什么 |
|---|---|---|
| `ERName` | `"test-for-aone-ci"` / `"$RANDOM"` | ER 函数名；`$RANDOM` 触发新仓库流程 |
| `TemplateName` | `"$RANDOM"` | 随机取个线上模板（仅在创新仓库场景） |
| `RootDirectory` | `"/ReactVite-without-esajsonc"` | 指向 fixture 子目录（必须以 `/` 开头） |
| `InstallCommand` | `"pnpm install"` / `"bun install"` / `"yarn"` / `"cnpm install"` / `"npm install"` | 测各包管理器分支 |
| `BuildCommand` | `"npm run build"` / `""` | 测构建命令逻辑 / 跳过构建 |
| `AssetsDirectory` | `"public"` / `""` | 测静态资源目录处理 |
| `EREntry` / `ErEntry` | `"index.js"` / `""` | 测 ER 函数入口 |
| `EnvironmentVariables` | `'{ "k": "v" }'`（字符串化的 JSON） | 测 env 注入；`"{"` 测非法兜底 |
| `NodeVersion` | `"20.x"` / `"22.x"` | 测 console 上选定的 Node 版本 |
| `ProductionBranch` | `"fake-branch"` | 测非生产分支跳过部署 |
| `CommitId` | `"54fe64d12..."` | 锁定到某个 commit 测试 |
| `ZipSizeQuota` / `FileCountQuota` / `FileSizeQuota` | `"0"` / `"1"` | 设极小阈值测配额检查 |

**完整参数清单的权威来源**：`TestStep/src/params.ts`，每次设计 case 前对照检查参数名是否拼对。

## 4. log 标记 `<<LOG>>step|<name><</LOG>>` 是什么

这是 TestStep 在每个阶段开始/结束时打的"状态机标记"，由 `step-toolkit` 的 `logStep` 工具发出。常见的：

- `<<LOG>>step|build<</LOG>>` / `<<LOG>>step|buildEnd<</LOG>>`
- `<<LOG>>step|deploy<</LOG>>` / `<<LOG>>step|deployEnd<</LOG>>`
- `<<LOG>>step|init<</LOG>>` / `<<LOG>>step|initEnd<</LOG>>`

这些是测试断言**最稳定的锚点** —— 比业务日志更不容易因功能改动而漂移。设计 case 时尽量在 `requireLogTextList` 里加一个 `<<LOG>>step|...End<</LOG>>` 标记，确认走完了对应阶段。

**配合 `notRequireLogTextList` 用**：例如测"非生产分支不应触发部署"时，断言 `<<LOG>>step|buildEnd<</LOG>>` 出现，**且** `<<LOG>>step|deploy<</LOG>>` 不出现。

## 5. 加 case 的标准动作

加一条 case 时按这个流程：

### Step 1：决定要测什么维度

写下一句话描述：「当 X 条件下，应该 Y 行为」。这个就是 `name`。

### Step 2：决定要不要新建 fixture

**复用现有 fixture 的情况**（**优先**）：
- 测的只是 `envs` 里参数的不同组合
- 例：测不同的 `InstallCommand`、`NodeVersion`、`CommitId` 等

**必须新建 fixture 的情况**：
- 文件层面的差异：缺/有某个文件、某文件内容特殊
- 例：`-without-package`（缺 package.json）、`-without-esajsonc`（缺 esa.jsonc）、`-node-engine`（package.json 里有特殊 engines.node）、`-with-skip-bad-er`（含故意写坏的 index.js + esa.jsonc 设了 skipFunctionBuild）

**绝对不要**：复制一份只为了加个 envs 参数 —— 这种用同一份 fixture + 不同 envs 的 case 即可。

### Step 3：（如需）创建 fixture

命名：`ReactVite-<场景后缀>`，后缀用 kebab-case，**直接表达被测维度**。

最小内容（从基线 ReactVite 复制后改）：

```
ReactVite-<场景>/
├── package.json     ← 视场景需要：保留 / 删除 / 改 engines / 改 scripts
├── esa.jsonc        ← 视场景需要：保留 / 删除 / 改字段
├── package-lock.json
├── vite.config.ts
├── index.html
├── eslint.config.js
├── tsconfig*.json
├── public/
├── src/
└── （场景特有文件，如 t.js / index.js）
```

提示：`README.md` 不强制，但留一个解释"这个 fixture 故意为什么场景而存在"对后人友好。

### Step 4：在 case.json 里追加

按现有顺序追加到数组末尾。不要修改已有 case（除非确认要修复）。

模板：

```json
{
  "name": "<一句话描述>",
  "envs": {
    "ERName": "test-for-aone-ci",
    "RootDirectory": "/<fixture 名>",
    "<其它参数>": "<值>"
  },
  "repoName": "test-for-aone-ci",
  "requireStatus": "SUCCESS",
  "requireLogTextList": [
    "<期望出现的关键字>",
    "<<LOG>>step|<相应阶段>End<</LOG>>"
  ]
}
```

### Step 5：自检 checklist

- [ ] `name` 能唯一表达测的是什么（不要 "测试 1" 这种）
- [ ] `RootDirectory` 以 `/` 开头并真实存在
- [ ] `requireLogTextList` 包含至少一个 `<<LOG>>step|...<</LOG>>` 锚点（除非测的就是更早阶段失败）
- [ ] 如果 `requireStatus: "FAIL"`，确认确实期望失败 —— 不是用 FAIL 来掩盖 case 本身写错
- [ ] 如果新建了 fixture，**README 里加一句**说明它存在的理由（避免被未来人误删）
- [ ] 改 fixture 时检查它是否被**多个 case** 共享：grep 一下 `case.json` 里 `RootDirectory` 引用次数

## 6. 已有 fixture 速查表（写新 case 前先看这个能不能复用）

### 6.1 ER 函数 / 静态站 fixture（基于 ReactVite）

| Fixture | 跟 ReactVite 基线的差异 | 适合测 |
|---|---|---|
| `ReactVite` | （基线，标准可构建项目） | 大部分 happy path / 改 envs 即可的 case |
| `ReactVite-without-esajsonc` | 没有 esa.jsonc + 多了 `index.js`（fetch 风格） | 测 esa.jsonc 缺失时的兜底 / 控制台参数为唯一来源 |
| `ReactVite-without-package` | 没有 package.json + 没有 esa.jsonc | 测纯静态站 / package.json 缺失分支 |
| `ReactVite-jsonc-installCommand-empty` | esa.jsonc 里 `installCommand: ""` | 测 jsonc 显式空 install 跳过 |
| `ReactVite-node-engine` | package.json 里 `engines.node: "24.13.0"` + esa.jsonc 没 buildCommand | 测 engines.node 触发 Node 自动安装 |
| `ReactVite-read-env` | 多了 `t.js`（`console.log(process.env.test_env)`） | 测 EnvironmentVariables 注入到子进程 |
| `ReactVite-with-skip-bad-er` | 含一个故意语法错的 `index.js` + esa.jsonc 设 `skipFunctionBuild: true` | 测 skipFunctionBuild 跳过 ER 函数构建 |

### 6.2 后端框架 fixture（packBackendFramework 路径）

每个都含真实框架 dep 的最小 app + `.gitignore`。需要 `npm install`。

| Fixture | 框架 / 风格 | 期望 framework slug | 适合测 |
|---|---|---|---|
| `Express-listen` | Express + `app.listen(8080)` | `express` | Express 探测 + listen 风格走 backend 路径 |
| `Hono-app` | Hono + `module.exports = app`（fetch 风格） | `hono` | Hono 探测 + Web fetch 风格走 backend 路径 |
| `Koa-app` | Koa + `app.listen(3000)` | `koa` | Koa 探测 + listen 风格走 backend 路径 |
| `Express-with-api` | Express + `/api/foo.js` 共存 | `express` | 分支优先级：有框架时 backend 优先于 fc-handlers |

### 6.3 FC handler fixture（packFcHandlers 路径）

无框架 deps，**不需要 install**（设 `InstallCommand: ""`）。

| Fixture | `/api/` 内容 | 适合测 |
|---|---|---|
| `FcHandlers-basic` | `foo.js`（Node 经典）+ `health.js`（fetch 对象）+ `items.js`（命名 GET/POST） | fc-handlers 模式触发 + 三种 handler 风格识别 |
| `FcHandlers-dynamic` | `users/profile.js` + `users/[id].js` + `posts/[...slug].js` | 动态路由编译 + 静态优先 + routes 数量 |
| `FcHandlers-conflict` | `[id].js` + `[name].js`（同 PCRE） | 路由冲突 build 失败 |

## 7. 反模式（不要这么干）

- ❌ **不要**为"参数组合差异"新建 fixture（属于 envs 范畴，复用就好）
- ❌ **不要**把 `requireLogTextList` 写得太松（如只写 `"build"` —— 任何路径都可能命中），尽量贴合具体场景关键字
- ❌ **不要**只填 `requireStatus` 不填 log —— 状态对了但走了错路径就检不出来
- ❌ **不要**改基线 `ReactVite` —— 它被多个 case 共享，改了会污染其它 case
- ❌ **不要**用 `requireStatus: "FAIL"` 掩盖你写错的 case；FAIL 必须是**期望就该失败**的场景

## 8. 几个真实例子（参考既有 case.json）

### 例 1：测包管理器 —— 复用 fixture，只改 envs
```json
{
  "name": "正常构建，使用yarn",
  "envs": {
    "ERName": "test-for-aone-ci",
    "RootDirectory": "/ReactVite-without-esajsonc",
    "InstallCommand": "yarn"
  },
  "repoName": "test-for-aone-ci",
  "requireStatus": "SUCCESS",
  "requireLogTextList": [
    "install yarn successfully",
    "<<LOG>>step|buildEnd<</LOG>>"
  ]
}
```

### 例 2：测文件级差异 —— 必须有专用 fixture
```json
{
  "name": "engines node v24.13.0",
  "envs": {
    "ERName": "test-for-aone-ci",
    "RootDirectory": "/ReactVite-node-engine"   // ← engines.node 写在这个 fixture 的 package.json 里
  },
  "repoName": "test-for-aone-ci",
  "requireStatus": "SUCCESS",
  "requireLogTextList": [
    "is not satisfied, installing version v24.13.0",
    "<<LOG>>step|buildEnd<</LOG>>"
  ]
}
```

### 例 3：负向断言 —— 测「非生产分支不部署」
```json
{
  "name": "正常构建，非生产分支",
  "envs": {
    "ERName": "test-for-aone-ci",
    "RootDirectory": "/ReactVite",
    "ProductionBranch": "fake-branch"
  },
  "repoName": "test-for-aone-ci",
  "requireStatus": "SUCCESS",
  "requireLogTextList": [
    "<<LOG>>step|buildEnd<</LOG>>"
  ],
  "notRequireLogTextList": [
    "<<LOG>>step|deploy<</LOG>>"
  ]
}
```

## 9. 总结：加 case 的最小动作清单

1. 想清楚要测的"X 条件 → Y 行为"
2. 在 §6 表格里找 fixture，能复用就复用
3. 不能复用就新建 `ReactVite-<场景>/`，最小化跟基线的差异
4. 在 case.json 末尾追加 case，至少一个 step 标记锚点
5. 走 §5 Step 5 的 checklist
6. 修了 fixture 的话，grep `RootDirectory` 看共享情况

如果场景跟现有 fixture 都不沾边、case 设计上又不确定 envs 怎么填，去 `TestStep/src/params.ts` 查权威参数列表 + `TestStep/src/steps/` 看各阶段实际行为 —— 那才是真理之源。
