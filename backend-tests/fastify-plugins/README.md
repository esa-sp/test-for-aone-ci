# Fastify 后端示例 · 多插件注册（register pattern）

> Fastify register pattern，按业务域拆分插件（health / users / products）、prefix 路由分组、服务层分离，配合 `@fastify/static` 托管演示页。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **插件注册模式**：`fastify.register` 按业务域拆分，每个插件独立封装路由逻辑
- ✅ **Prefix 路由分组**：`register(plugin, { prefix: '/api/users' })` 自动给插件内所有路由加前缀
- ✅ **服务层分离**：`UserService` 独立模块，插件内部实例化，演示真实项目的分层架构
- ✅ **插件化静态托管**：`@fastify/static` 注册即用
- ✅ **平台零配置**：推送即部署，框架自动检测
- ✅ **独立可跑**：`node server.js` 本地直接启动

## Tech Stack

- **框架**：Fastify 4
- **运行时**：Node.js
- **入口**：`server.js`
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
# 1. 安装依赖
cd backend-tests/fastify-plugins
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
2. `RootDirectory` 设为 `/backend-tests/fastify-plugins`
3. 平台自动识别为 Fastify 后端项目，完成打包部署

> 部署后访问根路径 `/` 即可看到演示页。

## Project Structure

```
fastify-plugins/
├── server.js              # 后端入口（register pattern + @fastify/static）
├── plugins/
│   ├── health.js          # 健康检查插件
│   ├── users.js           # 用户插件（prefix: /api/users）
│   └── products.js        # 商品插件（prefix: /api/products）
├── services/
│   └── userService.js     # 用户服务层（独立模块）
├── public/
│   ├── index.html         # 演示页（配置驱动，实时调用 API）
│   └── style.css          # 统一样式（亮色简洁 · 阿里橙）
├── package.json
├── meta.json              # 测试断言 + includeDirs 配置
├── template.json          # 控制台模板元数据
└── README.md
```

## API

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/` | 演示页（HTML） |
| GET | `/api/health` | 健康检查 |
| GET | `/api/users/:id` | 获取用户信息 |
| POST | `/api/users` | 创建用户（201） |
| GET | `/api/products?category=&page=&size=` | 商品列表（分类过滤 + 分页） |
| GET | `/api/products/:id` | 获取单个商品 |

## 平台能力标签

`零配置自动识别 Fastify` `框架自动检测` `一键部署到函数计算`

## License

MIT
