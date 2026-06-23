// Elysia + Web fetch handler 风格（node adapter）
// 默认 Elysia 是给 bun 用的；@elysiajs/node 让它在 Node 上跑（提供 listen 适配）
// 简化做法：直接 export { fetch }，start.mjs 走 Web adapter 分支
const { Elysia } = require('elysia');
const { staticPlugin } = require('@elysiajs/static');

const app = new Elysia()
  // 静态文件托管
  .use(staticPlugin({ assets: 'public', prefix: '/' }))
  // derive — Elysia 特色：类型安全地注入请求级上下文
  .derive(() => ({ requestTime: new Date().toISOString() }))
  .get('/api/health', ({ requestTime }) => ({ ok: true, framework: 'elysia', service: '类型安全表单', message: '服务运行中', requestTime }))
  .get('/api/users/:id', ({ params }) => ({ user: params.id, source: 'elysia', name: `用户#${params.id}` }))
  .post('/api/echo', ({ body }) => ({ received: body, echoed: true, timestamp: new Date().toISOString() }));

// 本地独立运行：node app.js
if (require.main === module) {
  const { node } = require('@elysiajs/node');
  const port = process.env.PORT || 3000;
  app.use(node()).listen(port);
  console.log(`listening on port ${port}`);
}

// app.fetch: (Request) => Response
module.exports = { fetch: app.fetch };
