# Express-listen fixture

最小 Express 应用，**listen 风格**：用户在代码里 `app.listen(8080)`，没有 `module.exports`。

测试目标：
- TestStep 探测到 Express 后端框架
- 走 `packBackendFramework` 分支
- backend-runtime 在 nft trace 时把 server.js 当成入口
- 产物 `code.zip` + `conf.jsonc` 生成成功

> 注意：用户写的 `app.listen(8080)` 和那条 console.log 在生产容器里都会被 start.js 的 listen 补丁吞掉，实际监听端口取自 `conf.jsonc.port`。这部分行为已在 framework-checker 单测里覆盖。
