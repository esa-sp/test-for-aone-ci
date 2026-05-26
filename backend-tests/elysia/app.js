// Elysia + Web fetch handler 风格（node adapter）
// 默认 Elysia 是给 bun 用的；@elysiajs/node 让它在 Node 上跑（提供 listen 适配）
// 简化做法：直接 export { fetch }，start.mjs 走 Web adapter 分支
const { Elysia } = require('elysia');

const app = new Elysia()
  .get('/api/health', () => ({ ok: true, framework: 'elysia' }))
  .get('/api/users/:id', ({ params }) => ({ user: params.id, source: 'elysia' }))
  .post('/api/echo', ({ body }) => ({ received: body }))
  .compile();

// app.fetch: (Request) => Response
module.exports = { fetch: app.fetch };
