# FcHandlers-conflict fixture

无后端框架，`/api/` 下故意放两个会编译出同一个 URL pattern 的文件：

- `api/[id].js`
- `api/[name].js`

二者都编译为 `^/api/([^/]+?)/?$`。

测试目标：
- 走 `packFcHandlers` 分支
- `scanFcHandlers` 检测到 Route conflict，抛错
- TestStep 把错包成 `Pack backend zip failed: Route conflict: ...`
- 整个 step **FAIL**
