# NestJS 多模块后端示例 · RBAC 权限（Guards + Pipes）

> NestJS 多模块架构，演示 ApiKeyGuard 鉴权、ParseIntPipe 参数校验、ValidationPipe 与 `@nestjs/serve-static` 静态托管。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **多模块架构**：HealthModule / UsersModule / ProductsModule 分模块，依赖注入
- ✅ **ApiKeyGuard**：`@UseGuards` 装饰器，`x-api-key` 校验，403 拦截
- ✅ **ParseIntPipe**：`@Param('id', ParseIntPipe)` 自动类型转换 + 校验
- ✅ **ValidationPipe**：全局管道，whitelist 过滤 + transform 类型转换
- ✅ **ServeStatic**：`@nestjs/serve-static` 托管演示页

## Tech Stack

- **框架**：NestJS 10
- **入口**：`dist/main.js`（`tsc` 编译产物）
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
cd backend-tests/nestjs-multimodule
npm install --no-audit --no-fund   # postinstall 自动 tsc
node dist/main.js
# 浏览器访问 http://localhost:3000
```

## Project Structure

```
nestjs-multimodule/
├── src/
│   ├── main.ts                      # 入口（ValidationPipe + 全局前缀）
│   ├── app.module.ts                # 根模块（ServeStatic + 子模块）
│   ├── common/guards/
│   │   └── api-key.guard.ts         # ApiKeyGuard
│   ├── health/
│   │   ├── health.controller.ts
│   │   └── health.module.ts
│   ├── users/
│   │   ├── users.controller.ts      # @UseGuards(ApiKeyGuard)
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   └── products/
│       ├── products.controller.ts   # ParseIntPipe
│       ├── products.service.ts
│       └── products.module.ts
├── public/
│   ├── index.html                   # 演示页
│   └── style.css                    # 统一样式
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
| GET | `/api/users/:id` | 获取用户信息（ParseIntPipe） |
| POST | `/api/users` | 创建用户（需 `x-api-key: secret`） |
| GET | `/api/products` | 商品列表 |
| GET | `/api/products/:id` | 商品详情（ParseIntPipe） |

## License

MIT
