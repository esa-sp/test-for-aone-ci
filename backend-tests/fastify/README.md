# Fastify 后端示例 · 商品搜索（Schema 校验）

> Fastify + response schema 校验，演示类型安全的商品搜索 API、querystring 自动类型转换，配合 `@fastify/static` 托管演示页。

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **Response Schema 校验**：Fastify 杀手锏，自动校验响应结构并快速序列化，性能与类型安全兼得
- ✅ **Querystring 类型转换**：schema 自动把字符串参数转 `integer`，告别手动 `parseInt`
- ✅ **插件化静态托管**：`@fastify/static` 注册即用，平台用 `includeDirs` 兜底打包
- ✅ **平台零配置**：推送即部署，框架自动识别、依赖自动追踪
- ✅ **独立可跑**：`node server.js` 本地直接启动

## Tech Stack

- **框架**：Fastify 4
- **运行时**：Node.js
- **入口**：`server.js`
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
# 1. 安装依赖
cd backend-tests/fastify
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
2. `RootDirectory` 设为 `/backend-tests/fastify`
3. 平台自动识别为 Fastify 后端项目，完成打包部署

> 部署后访问根路径 `/` 即可看到演示页。

## Project Structure

```
fastify/
├── server.js          # 后端入口（schema 校验 + @fastify/static）
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
| GET | `/api/users/:id` | 获取店主信息（params schema） |
| POST | `/api/echo` | 回显请求体（body schema） |
| GET | `/api/products?keyword=&page=` | 商品搜索（querystring 类型转换） |

## 平台能力标签

`零配置自动识别 Fastify` `nft 自动追踪依赖打包` `includeDirs 兜底静态文件` `端口自动拦截改写` `一键部署到函数计算`

## License

MIT
