# Express + TypeScript 后端示例 · 配置中心

> Express + TypeScript 强类型，演示接口定义、类型安全路由与配置中心 API，配合 `express.static` 托管演示页。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **TypeScript 接口**：`interface User` / `AppConfig` 定义数据结构，编译时类型检查
- ✅ **类型安全路由**：`Request` / `Response` 泛型类型，`req.params` 类型推断
- ✅ **tsc 编译**：`postinstall` 自动编译到 `dist/`，平台直接运行 `dist/index.js`
- ✅ **express.static**：静态文件路径 `path.join(__dirname, '..', 'public')` 兼容 `dist/` 产物
- ✅ **独立可跑**：`npm install && node dist/index.js`

## Tech Stack

- **框架**：Express 4 + TypeScript 5
- **入口**：`dist/index.js`（`tsc` 编译产物）
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
cd backend-tests/express-typescript
npm install --no-audit --no-fund   # postinstall 自动 tsc
node dist/index.js
# 浏览器访问 http://localhost:3000
```

## Project Structure

```
express-typescript/
├── src/
│   ├── index.ts              # 入口（静态 + 路由挂载）
│   └── routes/
│       ├── health.ts         # 健康检查
│       ├── users.ts          # 用户 CRUD（interface User）
│       └── config.ts         # 配置中心（interface AppConfig）
├── public/
│   ├── index.html            # 演示页
│   └── style.css             # 统一样式
├── package.json
├── tsconfig.json
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
| POST | `/api/users` | 创建用户 |
| GET | `/api/config` | 获取配置（AppConfig 接口） |

## License

MIT
