# Fullstack-react-express fixture

**综合 fixture**：同一个项目里同时含三种产物来源：

| 产物 | 来源 | 输出位置 |
|---|---|---|
| 前端 assets | `npm run build` 走 vite build → `dist/` | `index.zip` 内 `assets/` |
| ER 函数 | `edge.ts` 经 esbuild 编译 | `index.zip` 内 `routine/index.js` |
| 后端容器 | Express 项目（`server.js` + `node_modules/express`） | `index.zip` 内 `fc/code.zip` + `fc/conf.jsonc` |

## 测试目标

跑通 TestStep 的 **完整 fullstack 流程**：

1. install 全部依赖（前端 + 后端）
2. `npm run build` 生成前端 `dist/`
3. **`packBackendCode` 通过 `detector.detectAll()` 识别 Express**（是 detect→detectAll 改造的关键验证）
4. backend-runtime 的 nft trace 把 Express + server.js 打成 `fc/code.zip`
5. ER 函数 `edge.ts` esbuild 编译进 `routine/`
6. `dist/` 拷进 `assets/`
7. 三者一起进 `index.zip`

部署后由平台按 esa.jsonc 的 `edgeFunctionFirst: ["/edge/*", "/promo/*"]` 列表分发请求：
- `/edge/*` 和 `/promo/*` → ER 函数
- 其余命中静态 → assets
- 其它 → 后端容器（`/api/*`）

## 关键 case 断言

CI 上跑这条 case 的 requireLogTextList 应包含：

- `Detected backend project (framework: Express)` — 验证 detectAll 改造让 Express 被正确识别
- `nft trace finished:` — 验证 backend-runtime 走通
- `Backend zip created:` — 验证后端打包成功
- `Build artifacts generated successfully` — 验证前端 + ER 也都搞定
- `<<LOG>>step|buildEnd<</LOG>>` — 验证整个 build 阶段没炸

## 依赖说明

`package.json` 同时含 vite/react（前端）和 express（后端）依赖。这是真正的 fullstack 项目结构，目的就是验证 framework-checker 在多框架共存场景下的行为。

## 不部署也能验证 backend-runtime 行为

如果想本地验后端打包流程，可以单独把 `server.js` 当独立 Express 项目跑：

```bash
node_modules/.bin/node server.js   # 装完依赖后
curl http://localhost:8080/api/health
```
