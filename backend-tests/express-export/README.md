# Express 后端示例 · 留言板（module.exports 导出风格）

> Express + `module.exports = app` 导出风格，演示 asyncHandler 异步路由包装、全局错误中间件，配合 `express.static` 托管演示页。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **module.exports 导出**：不自调 `app.listen`，平台自动包入 `http.createServer`
- ✅ **asyncHandler**：Promise 包装异步路由，自动转发 rejection 到错误中间件
- ✅ **全局错误中间件**：四参数中间件统一捕获异常，返回结构化 JSON
- ✅ **express.static**：内置静态托管，平台用 `includeDirs` 兜底打包
- ✅ **独立可跑**：`node app.js` 本地直接启动

## Tech Stack

- **框架**：Express 4
- **运行时**：Node.js
- **入口**：`app.js`（`module.exports = app`）
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
cd backend-tests/express-export
npm install --no-audit --no-fund
node app.js
# 浏览器访问 http://localhost:3000
```

## Deploy

### 一键部署

点击上方 Deploy 按钮，平台自动 fork 仓库并完成构建部署。

### 手动导入

1. 将本仓库导入平台控制台
2. `RootDirectory` 设为 `/backend-tests/express-export`
3. 平台自动识别为 Express 后端项目，完成打包部署

## Project Structure

```
express-export/
├── app.js              # 后端入口（module.exports = app）
├── public/
│   ├── index.html      # 演示页
│   └── style.css       # 统一样式
├── package.json
├── meta.json           # 测试断言 + nft 配置
├── template.json       # 控制台模板元数据
└── README.md
```

## API

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/` | 演示页（HTML） |
| GET | `/api/health` | 健康检查 |
| GET | `/api/users/:id` | 获取访客信息 |
| POST | `/api/echo` | 回显请求体 |

## License

MIT
