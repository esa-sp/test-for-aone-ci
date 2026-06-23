# Koa 后端示例 · 访问日志（洋葱模型中间件）

> Koa + 洋葱模型中间件，演示 ctx 级联、访问日志与 `koa-static` 静态托管。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **洋葱模型中间件**：`async/await` + `await next()`，前后分别执行，形成洋葱结构
- ✅ **访问日志**：中间件自动记录 method / url / status / 耗时
- ✅ **ctx 级联**：`ctx.body` 赋值即响应，统一上下文
- ✅ **koa-static**：插件静态托管 `public/`
- ✅ **独立可跑**：`node server.js`

## Tech Stack

- **框架**：Koa 2
- **入口**：`server.js`
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
cd backend-tests/koa
npm install --no-audit --no-fund
node server.js
# 浏览器访问 http://localhost:3000
```

## Project Structure

```
koa/
├── server.js              # 入口（洋葱日志 + koa-static + 路由）
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
