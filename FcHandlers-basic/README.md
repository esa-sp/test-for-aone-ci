# FcHandlers-basic fixture

无后端框架，`/api/` 下放三种典型 handler 风格各一个：

- `api/foo.js` — Node 经典 `(req, res)`
- `api/health.js` — Web fetch 对象
- `api/items.js` — 命名 HTTP method（GET/POST）

测试目标：
- TestStep 走 `packFcHandlers` 分支（既无后端框架 deps）
- backend-runtime 的 `buildFcBundle` 生成 dispatcher start.js + routes.json
- routes 里至少 3 条静态路径
