# Elysia 后端示例 · 类型安全表单（链式 API + derive）

> Elysia + 链式 API + derive 类型安全注入，演示 Web Fetch handler 与 `staticPlugin` 静态托管。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **链式 API**：`.get().post().use()` 链式调用，声明式路由
- ✅ **derive**：类型安全注入请求级上下文，下游路由自动推导类型
- ✅ **Web Fetch**：`app.fetch: (Request) => Response`，原生 Web 标准
- ✅ **staticPlugin**：`@elysiajs/static` 托管 `public/`
- ✅ **独立可跑**：`node app.js`

## Tech Stack

- **框架**：Elysia 1
- **入口**：`app.js`（`module.exports = { fetch: app.fetch }`）
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
cd backend-tests/elysia
npm install --no-audit --no-fund
node app.js
# 浏览器访问 http://localhost:3000
```

## Project Structure

```
elysia/
├── app.js                 # 入口（链式路由 + derive + staticPlugin）
├── public/
│   ├── index.html         # 演示页
│   └── style.css          # 统一样式
├── package.json
├── meta.json
├── template.json
└── README.md
```

## API

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/` | 演示页（HTML） |
| GET | `/api/health` | 健康检查 |
| GET | `/api/users/:id` | 获取用户信息 |
| POST | `/api/echo` | 回显请求体 |

## License

MIT
