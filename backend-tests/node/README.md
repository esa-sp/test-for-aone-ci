# Node 原生后端示例 · 原生路由（无框架）

> 纯 Node.js `http.createServer`，无任何后端框架，演示 URL 路由匹配与手动 `fs` 静态托管。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **零框架依赖**：纯 Node.js `http` 模块，`package.json` 无任何 `dependencies`
- ✅ **URL 路由匹配**：`new URL()` + `pathname` 匹配 + `RegExp` 参数提取
- ✅ **手动 fs 静态**：`fs.readFileSync` 读取 `public/`，`setHeader` 设置 `content-type`
- ✅ **兜底识别**：平台 framework-checker 的 `node` 兜底 slug，无框架也能部署
- ✅ **独立可跑**：`node server.js`

## Tech Stack

- **运行时**：Node.js（纯内置模块）
- **入口**：`server.js`
- **静态演示页**：原生 HTML/CSS/JS（`public/`，手动 `fs` 读取）

## Quick Start

```bash
cd backend-tests/node
node server.js
# 浏览器访问 http://localhost:3000
```

> 无需 `npm install`，零依赖。

## Project Structure

```
node/
├── server.js              # 入口（URL 路由 + 手动 fs 静态）
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
| GET | `/api/users/:id` | 获取用户信息（RegExp 匹配） |
| POST | `/api/echo` | 回显请求体 |

## License

MIT
