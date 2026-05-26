# Nuxt-app fixture

最小 Nuxt 3 应用，用默认 `node-server` preset。

测试目标：
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
