# NestJS-app fixture

最小 NestJS 应用，入口在 **src/main.ts**（NestJS 框架特化候选位置之一）。

测试目标：
- framework-checker 探测 `nestjs` slug（`@nestjs/core` import + framework 特化的 entry candidate `src/main.ts`）
- backend-runtime 的 inferEntry 根据 slug 找到 `src/main.ts` 而不是 COMMON_ENTRY_NAMES 里的常规位置
- TestStep 走 backend 路径

> NestJS 容器实际运行需要 ts-node 或预编译 dist。本 fixture 仅验证 build 阶段的探测 + 打包，不验证容器内运行。
