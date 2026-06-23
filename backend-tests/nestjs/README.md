# NestJS 后端示例 · 资源管理（ValidationPipe + DTO）

> NestJS + ValidationPipe + class-validator，演示装饰器驱动的资源管理 API、DTO 自动校验，配合 `@nestjs/serve-static` 托管演示页。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **ValidationPipe 全局管道**：NestJS 杀手锏，自动校验 DTO + 类型转换 + 过滤未声明属性
- ✅ **DTO 装饰器校验**：`@IsString` / `@IsInt` / `@MinLength` 声明字段约束，非法请求返回 400
- ✅ **模块化架构**：Controller / Module / DTO 分层，依赖注入，企业级可维护性
- ✅ **ServeStatic 静态托管**：`@nestjs/serve-static` 托管演示页
- ✅ **平台零配置**：推送即部署，框架自动检测
- ✅ **独立可跑**：`npm install && node dist/main.js` 本地直接启动

## Tech Stack

- **框架**：NestJS 10
- **运行时**：Node.js + TypeScript 5
- **入口**：`dist/main.js`（`tsc` 编译产物）
- **校验**：class-validator + class-transformer
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
# 1. 安装依赖（postinstall 自动触发 tsc 编译）
cd backend-tests/nestjs
npm install --no-audit --no-fund

# 2. 本地启动
node dist/main.js

# 3. 打开演示页
# 浏览器访问 http://localhost:3000
```

## Deploy

### 一键部署

点击上方 Deploy 按钮，平台自动 fork 仓库并完成构建部署。

### 手动导入

1. 将本仓库导入平台控制台
2. `RootDirectory` 设为 `/backend-tests/nestjs`
3. 平台自动识别为 NestJS 后端项目，完成 `tsc` 编译与打包部署

> 部署后访问根路径 `/` 即可看到演示页。

## Project Structure

```
nestjs/
├── src/
│   ├── main.ts              # 入口（ValidationPipe + 端口统一）
│   ├── app.module.ts        # 模块（ServeStaticModule 注册）
│   ├── app.controller.ts    # 控制器（health/users/echo/items）
│   └── create-item.dto.ts   # DTO（class-validator 装饰器）
├── public/
│   ├── index.html           # 演示页（配置驱动，实时调用 API）
│   └── style.css            # 统一样式（亮色简洁 · 阿里橙）
├── package.json
├── tsconfig.json
├── meta.json                # 测试断言 + includeDirs 配置
├── template.json            # 控制台模板元数据
└── README.md
```

## API

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/` | 演示页（HTML） |
| GET | `/api/health` | 健康检查 |
| GET | `/api/users/:id` | 获取用户信息（@Param 装饰器） |
| POST | `/api/echo` | 回显请求体 · 返回 201 |
| GET | `/api/items` | 资源列表 |
| POST | `/api/items` | 创建资源 · ValidationPipe 校验 DTO |

## 平台能力标签

`零配置自动识别 NestJS` `框架自动检测` `一键部署到函数计算`

## License

MIT
