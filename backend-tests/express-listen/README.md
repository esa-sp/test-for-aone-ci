# Express 后端示例 · 留言板（app.listen 风格）

> Express 经典 `app.listen` 启动风格，演示异步路由包装（asyncHandler）与全局错误处理中间件，配合 `express.static` 托管演示页。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **app.listen 经典风格**：最传统的 Express 启动方式，平台自动拦截 listen 端口并改写为运行时端口
- ✅ **异步路由包装**：`asyncHandler` 包裹 async 路由，把 Promise rejection 转给错误中间件，告别 `unhandledRejection`
- ✅ **全局错误处理**：四参数错误中间件统一兜底，返回结构化 JSON 错误
- ✅ **静态文件托管**：`express.static` 一行托管 `public/` 演示页，平台用 `includeDirs` 兜底打包
- ✅ **平台零配置**：推送即部署，框架自动识别、依赖自动追踪
- ✅ **独立可跑**：`node server.js` 本地直接启动

## Tech Stack

- **框架**：Express 4
- **运行时**：Node.js
- **入口**：`server.js`
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
# 1. 安装依赖
cd backend-tests/express-listen
npm install --no-audit --no-fund

# 2. 本地启动
node server.js

# 3. 打开演示页
# 浏览器访问 http://localhost:3000
```

## Deploy

### 一键部署

点击上方 Deploy 按钮，平台自动 fork 仓库并完成构建部署。

### 手动导入

1. 将本仓库导入平台控制台
2. `RootDirectory` 设为 `/backend-tests/express-listen`
3. 平台自动识别为 Express 后端项目，完成打包部署

> 部署后访问根路径 `/` 即可看到演示页。

## Project Structure

```
express-listen/
├── server.js          # 后端入口（app.listen + async 路由 + 错误中间件）
├── public/
│   ├── index.html     # 演示页（配置驱动，实时调用 API）
│   └── style.css      # 统一样式（亮色简洁 · 阿里橙）
├── package.json
├── meta.json          # 测试断言 + nft 配置（includeDirs: ["public"]）
├── template.json      # 控制台模板元数据
└── README.md
```

## API

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/` | 演示页（HTML） |
| GET | `/api/health` | 健康检查 |
| GET | `/api/users/:id` | 获取留言作者（异步查库模拟） |
| POST | `/api/echo` | 回显请求体（发布预览） |
| GET | `/api/error-demo` | 触发异常，演示全局错误处理返回 500 |

## 平台能力标签

`零配置自动识别 Express` `nft 自动追踪依赖打包` `includeDirs 兜底静态文件` `端口自动拦截改写` `一键部署到函数计算`

## License

MIT
