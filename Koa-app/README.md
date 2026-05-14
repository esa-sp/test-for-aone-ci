# Koa-app fixture

最小 Koa 应用，**listen 风格**。

测试目标：
- TestStep 探测到 Koa 后端框架（slug=koa）
- 走 `packBackendFramework` 分支
- 产物 `code.zip` + `conf.jsonc` 生成成功

> Koa 的 `app.listen(...)` 内部走 `http.createServer(app.callback()).listen()`，`app.callback()` 返回的是 `(req,res)` handler。backend-runtime 的 start.js 通过 listen 补丁捕获 server 实例。
