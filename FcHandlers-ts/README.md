# FcHandlers-ts fixture

测试 FC Handler TypeScript 预编译功能。

**3 个 `.ts` handler 文件（覆盖三种导出风格）：**
- `api/foo.ts` — Node 经典 `(req, res)` 风格
- `api/health.ts` — Web fetch 对象风格
- `api/items.ts` — 命名 HTTP method（GET/POST）风格

**测试目标：**
- TestStep 检测到 `tsconfig.json` + `/api/*.ts` → 触发 esbuild 预编译
- `.ts` 被改名为 `.ts.bak`，编译出 `.js`，fc-bundle 扫描 `.js` 生成路由
- 构建完成后 `.ts` 恢复，编译产物 `.js` 被清理
- 日志输出 `FC handler TS precompile: 3 compiled, 0 skipped (user-compiled), 3 total`
- `fc-bundle finished: 3 routes` — 3 条路由（每个 handler 一条）
