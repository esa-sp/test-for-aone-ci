# {{Framework}} 后端示例 · {{Scenario}}

> {{一句话描述本示例展示的框架能力与业务场景。}}

[![Deploy]({{DEPLOY_BADGE_URL}})]({{DEPLOY_URL}})
[在线 Demo]({{DEMO_URL}})

## Features

- ✅ **{{框架特色 1}}**：{{说明}}
- ✅ **{{框架特色 2}}**：{{说明}}
- ✅ **平台零配置**：推送即部署，框架自动识别、依赖自动追踪
- ✅ **独立可跑**：`node {{entry}}` 本地直接启动，不依赖平台

## Tech Stack

- **框架**：{{Framework}} {{version}}
- **运行时**：Node.js
- **入口**：`{{entry}}`
- **静态演示页**：原生 HTML/CSS/JS（`public/`）

## Quick Start

```bash
# 1. 安装依赖
cd {{fixture-name}}
npm install --no-audit --no-fund

# 2. 本地启动
node {{entry}}
# 或开发模式（如适用）
# npm run dev

# 3. 打开演示页
# 浏览器访问 http://localhost:3000
```

## Deploy

### 一键部署

点击上方 Deploy 按钮，平台自动 fork 仓库并完成构建部署。

### 手动导入

1. 将本仓库导入平台控制台
2. RootDirectory 设为 `/backend-tests/{{fixture-name}}`
3. 平台自动识别为 {{Framework}} 后端项目，完成打包部署

> 部署后访问根路径 `/` 即可看到演示页。

## Project Structure

```
{{fixture-name}}/
├── {{entry}}          # 后端入口
├── public/
│   ├── index.html     # 演示页（配置驱动，实时调用 API）
│   └── style.css      # 统一样式（亮色简洁 · 阿里橙）
├── package.json
├── meta.json          # 测试断言 + nft 配置（includeDirs）
├── template.json      # 控制台模板元数据
└── README.md
```

## API

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/` | 演示页 |
| GET | `/api/health` | 健康检查 |
| ... | ... | ... |

## 平台能力标签

`零配置自动识别` `nft 自动追踪依赖` `includeDirs 兜底静态文件` `端口自动拦截改写` `一键部署函数计算`

## License

MIT
