# Nuxt-app 示例项目

Nuxt 3 示例应用，展示 ISR（增量静态再生）与服务端 API 路由。

## 核心特性

- **SSR 渲染**：Nuxt 服务端渲染，首屏直出
- **ISR (SWR)**：`routeRules.swr: 60` 页面缓存 60 秒后后台再生
- **Nitro 引擎**：`node-server` preset，产出自包含 `.output/server/index.mjs`
- **文件路由**：`pages/` 自动路由 + `server/api/` 自动接口

## ISR 配置

```typescript
// nuxt.config.ts
routeRules: {
  '/': { swr: 60 }  // 60 秒后后台再生
}
```

首页显示 ISR 最后再生时间戳，刷新页面可观察时间变化（SWR 60s 后后台再生）。

## API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/health | 健康检查 |
| GET | /api/users/:id | 获取用户信息 |
| POST | /api/echo | 回显请求体 |

## 本地运行

```bash
npm install
npm run dev      # 开发模式
npm run build    # 构建
npm start        # 生产启动
```

## 测试目标

- TestStep 的 `ProjectDetector.detectAll` 同时返回 `nuxtjs + h3 + vite + node`
- `packBackendCode` 走**分支 0（meta-framework）**而非分支 1（backend framework）
- 调 `framework-checker/meta-runtime` 的 `packMetaFramework('nuxtjs', ...)`
- adapter 消费 `.output/server/` + `.output/public/`，跳过 nft trace
- 产物 `code.zip` + `conf.jsonc` + `assets/` 同时生成
- `collectArtifacts` 看到 `ctx.assetsAlreadyCollected = true`，跳过默认 `dist/` 拷贝

跟 backend framework（Express/Koa/Hono 等）的核心区别：
- 不跑 nft trace（Nuxt 自己 build 出自包含 `.output/server/index.mjs`）
- assets 由 adapter 直接从 `.output/public` 拷出，不走默认 `dist/`
- `runBuildCommand` 必须跑 `nuxt build`（fixture 的 `scripts.build`）
