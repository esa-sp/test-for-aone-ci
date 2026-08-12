# Express-ts-precompile fixture

测试 TestStep 的 Backend TypeScript 自动预编译功能（esbuild 路径）。

**关键设计**：
- 有 `tsconfig.json` → 触发 `isTsProject()` 返回 true
- 入口 `server.ts` 在根目录 → `resolveTsEntry()` 找到它
- **无 postinstall / buildCommand** → 用户未编译，走 esbuild 预编译路径
- Express 框架 → 不在 SKIP_SLUGS（nestjs/midway/nextjs/nuxtjs）中，需要预编译
- 纯后端项目 → 不是 fullstack，不会跳过预编译

**预期日志**：
1. `TypeScript entry detected (server.ts), precompiling with esbuild...`
2. `TypeScript compiled: server.ts → .ts-build/entry.js`
3. `Detected backend project (framework: Express), nft tracing from compiled entry...`
4. `nft trace finished:`
5. `Backend zip created:`
6. `buildEnd`
