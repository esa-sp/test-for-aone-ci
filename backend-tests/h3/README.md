# H3 后端示例 · 边缘计数器（手动 fs 静态）

> H3 + eventHandler + toNodeListener，演示手动 fs 静态文件托管与边缘计数器 API。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **eventHandler**：声明式事件处理器，自动序列化返回值
- ✅ **toNodeListener**：将 H3 app 转为 Node.js http.Listener
- ✅ **手动 fs 静态**：无内置 static 中间件，`fs.readFileSync` + `setHeader` 手动托管
- ✅ **独立可跑**：`node server.js`

## Tech Stack

- **框架**：H3 1
- **入口**：`server.js`
- **静态演示页**：原生 HTML/CSS/JS（`public/`，手动 fs 读取）

## Quick Start

```bash
cd backend-tests/h3
npm install --no-audit --no-fund
node server.js
# 浏览器访问 http://localhost:3000
```

## Project Structure

```
h3/
├── server.js              # 入口（手动 fs 静态 + eventHandler 路由）
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
| GET | `/style.css` | 样式表（CSS） |
| GET | `/api/health` | 健康检查 |
| GET | `/api/users/:id` | 获取用户信息 |
| POST | `/api/echo` | 回显请求体 |

## License

MIT
