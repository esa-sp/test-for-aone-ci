// Hono + Web fetch 风格
// app.fetch 是 (request) => Response —— start.mjs 走 Web adapter 分支
const { Hono } = require('hono');
const { serveStatic } = require('@hono/node-server/serve-static');

const app = new Hono();

// 中间件链 — Hono 特色：c.set / c.get 跨中间件传值
app.use('*', async (c, next) => {
  c.set('requestTime', new Date().toISOString());
  await next();
});

// 静态文件托管
app.use('/*', serveStatic({ root: './public' }));

app.get('/api/health', (c) => c.json({ ok: true, framework: 'hono', service: '问候卡', message: '服务运行中' }));
app.get('/api/users/:id', (c) => c.json({ user: c.req.param('id'), source: 'hono', name: `用户#${c.req.param('id')}`, greeting: '你好！' }));
app.post('/api/echo', async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, echoed: true, timestamp: new Date().toISOString() });
});

// 本地独立运行：node app.js
if (require.main === module) {
  const { serve } = require('@hono/node-server');
  const port = process.env.PORT || 3000;
  serve(app, { port }, (info) => console.log(`listening on port ${info.port}`));
}

module.exports = app;
