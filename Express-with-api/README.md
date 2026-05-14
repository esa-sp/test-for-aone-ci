# Express-with-api fixture

Express 后端项目 + 同时存在 `/api/` 下的 handler 文件。

测试目标：**分支优先级** —— TestStep 的 `packBackendCode` 应优先走 `packBackendFramework`（因为 Express 已被探测到），**不应**走 `packFcHandlers`。

具体断言：
- log 含 `Detected backend project (framework: Express)`
- log **不含** `No backend framework but /api/ has FC handler files`
- 设计意图：有框架时让框架自己的 router 处理 `/api/*`，避免和我们的 dispatcher 冲突
