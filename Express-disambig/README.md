# Express-disambig fixture

`server.js`（不 import express，是诱饵）+ `app.js`（真正 import express）。

测试目标：
- framework-checker 的 import regex 二次校验机制：在多候选时，**优先选真正 import 框架的文件**
- 朴素实现会选 server.js（COMMON_ENTRY_NAMES 第一位）→ 后续 nft trace 会丢失 express 依赖图 → 错误的产物
- 我们的实现选 app.js → 正确产物

E2E 弱断言：detected Express + Backend zip 生成（强断言由 framework-checker 单测覆盖：`manifest.entry` 含 `app.js`）。
