# backend-tests

每个支持的后端框架一份独立 fixture + 断言，用来**真跑** framework-checker/backend-runtime 的生成物。
跟顶层 `case.json` 完全解耦 —— 顶层那套验 TestStep 编排 + 云效 + FC 真部署；本目录只验 framework-checker 生成的 `start.mjs` 在本机能正确响应 HTTP。

## 为啥单独建一套

| 角度 | 顶层 case.json | backend-tests |
|---|---|---|
| 测什么 | TestStep 编排（install / build / pack / deploy / quota …）+ 云效流水线 + FC 平台行为 | framework-checker 生成的 start.mjs 真能跑、HTTP 路径真能响应 |
| 跑在哪 | 触发 → Aone-ci；实际 → 云效 build runner + FC | 全程 Aone-ci 单机 loopback |
| 失败定位 | 拉云效 pipeline log 字符串匹配 | curl response 直接打印 |
| 单 case 耗时 | 分钟级 | 秒级 |
| 覆盖目标 | 用户主流程 | 框架级"能跑"承诺 |

两套互补：顶层 case.json 验**端到端**，本目录验**生成物正确性**。

## 目录约定

```
backend-tests/
├── <fixture-name>/
│   ├── package.json            # 含目标框架 dep；可含 type:module / .cjs 后缀混搭
│   ├── <entry>.{js,cjs,mjs,ts} # 用户代码
│   ├── node_modules/           # 跑测试前必须 npm install 装好
│   └── meta.json               # 断言定义（见下方 schema）
└── README.md
```

fixture 命名约定：`<framework-slug>-<flavor>`，例如：
- `express-listen` — Express + `app.listen()` 风格
- `express-export` — Express + `module.exports = app`（无 listen）
- `hono-default` — Hono 标准写法
- `nestjs-bootstrap` — NestJS 标准 `bootstrap()` 入口

每个支持的 framework slug **至少一份** fixture；多 flavor 各一份。

## meta.json schema

```jsonc
{
  // 必填
  "name": "Express + app.listen 风格",      // 报告里展示用
  "framework": "express",                    // 期望 ProjectDetector 识别到的 slug
  "mode": "direct",                          // 期望 runtime.json.mode（"direct" / "fc-handlers" / "spawn"）
  "port": 3000,                              // start.mjs 监听端口（=manifest.port）
  "assertions": [                            // ≥1 条 HTTP 断言
    {
      "path": "/api/health",                 // 必填
      "method": "GET",                       // 可选，默认 GET
      "headers": { "content-type": "..." },  // 可选
      "body": { "k": "v" } | "raw string",   // 可选，POST/PUT 用；object 自动 JSON.stringify
      "expectedStatus": 200,                 // 必填
      "bodyContains": "ok",                  // 可选，子串匹配
      "bodyJsonSubset": { "user": "42" }     // 可选，JSON 子集匹配（response 必须 ⊇ 该对象）
    }
  ],

  // 可选
  "entry": "server.cjs",                     // 期望识别到的 entry 文件名（仅校验，不影响构建）
  "warmupTimeoutMs": 8000,                   // 等 readySignal 出现的超时（默认 8000）
  "shutdownTimeoutMs": 3000,                 // SIGTERM 后等子进程退出的超时（默认 3000）
  "readySignal": "listening on port",        // stdout 出现此子串视为启动完成（默认 "listening on port"）
  "skip": false,                             // true 则跳过这个 fixture
  "skipReason": "WIP",                       // skip=true 时的说明

  // spawn 模式专用（mode: "spawn"，如 egg / egg-scripts 需要 launcher 的框架）
  "spawnCommand": [                          // 必填；数组每项支持 $PORT 占位符（自动替换为本次随机分到的端口）
    "node",
    "node_modules/egg-scripts/bin/egg-scripts.js",
    "start",
    "--port=$PORT",
    "--daemon=false"
  ],

  // includeFiles：精确文件路径（相对 fixture 根），追加进 nft fileList
  "includeFiles": ["app/extend/helper.js"],

  // includeDirs：递归把整个目录的所有文件塞进 nft fileList
  // 用于 egg/midway 这类动态加载 plugin 的框架，nft 静态 trace 看不到 plugin 链路
  // 慢但兜底有效（egg 项目通常 includeDirs:["node_modules"]）
  "includeDirs": ["node_modules"]
}
```

## 断言规则

- `expectedStatus` 必须严格相等
- `bodyContains` 子串匹配（区分大小写）
- `bodyJsonSubset` 把 response body 当 JSON parse，验对象**包含**指定字段（response 可以有更多字段，不能少）
- 一条 assertion 多个匹配字段同时填的话**全部满足**才通过
- 任一断言失败 → 整 fixture 失败；同 fixture 其它断言继续跑（拿到完整失败清单）

## 运行

```bash
# 装所有 fixture 的 deps
cd test-for-aone-ci/backend-tests
for d in */; do (cd "$d" && npm install --no-audit --no-fund); done

# 单跑（在 TestStep 仓 build 完之后）
cd TestStep && npm run build
node blackBox/backendTest/index.js

# 只跑一个 fixture
node blackBox/backendTest/index.js express-listen

# 接入主流程跑（blackBox 入口自动调）
node blackBox/index.js
```

## 退出码

- `0`：所有非 skip 的 fixture 全部断言通过
- `1`：至少一个 fixture 任一断言失败 / 启动失败 / framework-checker 报错

## 怎么加一个新框架 fixture

1. 在 `backend-tests/<framework-slug>-<flavor>/` 建目录
2. 写最小可运行的 entry + `package.json` 含目标框架 dep
3. 写 `meta.json`（参考已有的）
4. 本地 `cd <fixture> && npm install` 装 deps
5. 跑 `node TestStep/blackBox/backendTest/index.js <fixture-name>` 验证
6. commit（含 `node_modules/` 吗？看仓库策略 —— 当前推荐：不 commit `node_modules`，CI runner 跑前先批量 install）

## 不在本目录测的东西

- TestStep 编排（install / runBuildCommand / collectArtifacts / packZip）→ 顶层 case.json 已测
- FC 平台 conf.jsonc 字段、nodejs runtime 选择、CDN 分发 → 顶层 case.json 已测
- 部署后冷启延迟、网络抖动 → 必须真 FC 才能测，不在本目录范围

本目录承诺：**framework-checker 说支持的每个框架，都能在本机跑通 + 响应正确**。
