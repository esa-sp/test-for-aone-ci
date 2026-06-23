# Hono 后端示例 · 问候卡（Web Fetch API）

> Hono + Web Fetch API，演示中间件链、c.set/c.get 跨中间件传值与 `serveStatic` 静态托管。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **中间件链**：`app.use('*', ...)` 注册中间件，`await next()` 级联执行
- ✅ **Web Fetch API**：`app.fetch` 是 `(Request) => Response`，原生 Web 标准
- ✅ **c.set / c.get**：跨中间件传值，灵活共享上下文
- ✅ **serveStatic**：`@hono/node-server/serveStatic` 托管 `public/`
- ✅ **独立可跑**：`node app.js`

## Tech Stack

- **框架**：Hono 4
- **入口**：`app.js`（`module.exports = app`，平台走 `app.fetch`）
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
cd backend-tests/hono
npm install --no-audit --no-fund
node app.js
# 浏览器访问 http://localhost:3000
```

## Project Structure

```
hono/
├── app.js                 # 入口（中间件链 + serveStatic + 路由）
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
| GET | `/api/users/:id` | 获取用户信息 + 问候语 |
| POST | `/api/echo` | 回显请求体 |

## License

MIT
