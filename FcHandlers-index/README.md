# FcHandlers-index fixture

无后端框架，`/api/` 下两个 index.js 测试**末尾 index 折叠**：

- `api/index.js` → URL `/api`（pattern `^/api/?$`）
- `api/users/index.js` → URL `/api/users`（pattern `^/api/users/?$`）

测试目标：scanFcHandlers 把末尾 `index` 段去掉，跟父目录路由等价。这是 Vercel filesystem routing 的同款约定。
