# Hono-app fixture

最小 Hono 应用，**Web fetch 风格**：导出 Hono app 实例（自带 `.fetch` 方法）。

测试目标：
- TestStep 探测到 Hono 后端框架（slug=hono）
- 走 `packBackendFramework` 分支
- 产物 `code.zip` + `conf.jsonc` 生成成功

> Web Standard IO adapter 在 backend-runtime 的 start.js 里把 `{ fetch }` 翻译成 Node `(req, res)`。这部分行为已在 framework-checker 单测里覆盖。
