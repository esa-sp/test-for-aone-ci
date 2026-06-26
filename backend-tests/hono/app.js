// Hono + Web fetch 风格
// app.fetch 是 (request) => Response —— start.mjs 走 Web adapter 分支
const { Hono } = require('hono');
const path = require('path');
const fs = require('fs');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};
const publicDir = path.join(__dirname, 'public');

const app = new Hono();

// 中间件链 — Hono 特色：c.set / c.get 跨中间件传值
app.use('*', async (c, next) => {
  c.set('requestTime', new Date().toISOString());
  await next();
});

app.get('/api/health', (c) => c.json({ ok: true, framework: 'hono', service: '问候卡', message: '服务运行中' }));
app.get('/api/users/:id', (c) => c.json({ user: c.req.param('id'), source: 'hono', name: `用户#${c.req.param('id')}`, greeting: '你好！' }));
app.post('/api/echo', async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, echoed: true, timestamp: new Date().toISOString() });
});

// 静态文件托管（通配路由，放在 API 路由之后）
app.get('/*', (c) => {
  let fileParam = c.req.path.slice(1);
  if (fileParam === '' || fileParam.endsWith('/')) {
    fileParam += 'index.html';
  }
  const filePath = path.join(publicDir, fileParam);
  if (!filePath.startsWith(publicDir)) {
    return c.notFound();
  }
  try {
    const data = fs.readFileSync(filePath);
    return new Response(data, {
      headers: { 'content-type': MIME[path.extname(filePath)] || 'text/plain; charset=utf-8' },
    });
  } catch {
    return c.notFound();
  }
});

// 本地独立运行：node app.js
if (require.main === module) {
  const { serve } = require('@hono/node-server');
  const port = process.env.PORT || 3000;
  serve({ fetch: app.fetch, port }, (info) => console.log(`listening on port ${info.port}`));
}

module.exports = app;
