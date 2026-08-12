# FcHandlers-comprehensive fixture

无后端框架，`/api/` 下覆盖所有 FC handler 路由模式的综合测试 fixture：

**三种 handler 风格：**
- `api/foo.js` — Node 经典 `(req, res)`
- `api/health.js` — Web fetch 对象
- `api/items.js` — 命名 HTTP method（GET/POST）

**动态路由：**
- `api/users/[id].js` — 单段动态参数
- `api/users/profile.js` — 静态路径优先于动态参数
- `api/posts/[...slug].js` — 多段 catch-all

**前端页面：**
- `public/index.html` + `public/style.css` — 演示页（阿里橙主题 + 暗色切换 + API 实时测试）

测试目标：
- TestStep 走 `packFcHandlers` 分支
- `fc-bundle` 生成 6 条路由（3 静态 + 1 动态参数 + 1 静态优先 + 1 catch-all）
- `AssetsDirectory: "public"` 同时打包前端页面
- 一次构建覆盖原有 dynamic + optional + basic 三个 fixture 的所有场景
