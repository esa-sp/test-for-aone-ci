# FcHandlers-dynamic fixture

无后端框架，`/api/` 下混合静态 / 动态 / catch-all 路由：

- `api/users/profile.js` —— 静态路径
- `api/users/[id].js` —— 单段动态参数
- `api/posts/[...slug].js` —— 末尾贪婪 catch-all

测试目标：
- 走 `packFcHandlers` 分支
- routes 共 3 条
- pattern 编译正确：
  - `^/api/users/profile/?$`
  - `^/api/users/([^/]+?)/?$`
  - `^/api/posts/(.+?)/?$`
- 静态优先于动态（priority 排序：profile > [id] > [...slug]）
