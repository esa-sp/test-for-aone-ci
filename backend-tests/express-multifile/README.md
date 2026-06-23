# Express 多文件后端示例 · 任务管理（鉴权 + 分页）

> Express 多文件架构，演示路由/中间件/Service 分层、API Key 鉴权、分页查询，配合 `express.static` 托管演示页。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **多文件路由分离**：`routes/` 按资源拆分，`app.js` 统一挂载
- ✅ **authMiddleware**：API Key 认证中间件，`x-api-key` 校验，401 拦截
- ✅ **Service 分层**：`services/` 封装业务逻辑，Controller 只做路由转发
- ✅ **全局错误中间件**：四参数中间件统一捕获异常
- ✅ **express.static**：内置静态托管演示页

## Tech Stack

- **框架**：Express 4
- **入口**：`app.js`
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
cd backend-tests/express-multifile
npm install --no-audit --no-fund
node app.js
# 浏览器访问 http://localhost:3000
```

## Project Structure

```
express-multifile/
├── app.js                    # 入口（路由挂载 + 静态 + 错误中间件）
├── middleware/
│   ├── auth.js               # API Key 认证
│   └── errorHandler.js       # 全局错误处理
├── routes/
│   ├── health.js             # 健康检查
│   ├── users.js              # 用户 CRUD（含鉴权）
│   └── items.js              # 任务分页查询
├── services/
│   └── userService.js        # 用户 Service 层
├── public/
│   ├── index.html            # 演示页
│   └── style.css             # 统一样式
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
| POST | `/api/users` | 创建用户（需 `x-api-key: test-key`） |
| GET | `/api/items?page=&size=` | 任务分页查询 |

## License

MIT
