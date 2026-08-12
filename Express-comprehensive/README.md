# Express-comprehensive fixture

合并三个 Express 边缘测试场景到一个 fixture：

1. **入口消歧**：`server.js` 是诱饵（不 import Express），`app.js` 是真正的入口
2. **框架优先于 FC handlers**：`/api/foo.js` 存在但 Express 应优先处理
3. **views/ 模板自动追踪**：设置 view engine 后 nft 会追踪 EJS 模板文件

测试目标：
- TestStep 识别 `app.js` 为入口（跳过 decoy `server.js`）
- 走 `packBackendFramework` 分支（不走 `packFcHandlers`）
- `nft trace` 包含 `views/` 下的模板文件
- 一次构建覆盖原有 with-api + with-views + disambig 三个 fixture
