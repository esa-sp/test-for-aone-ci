// Hono + Web fetch 风格
// app.fetch 是 (request) => Response —— start.mjs 走 Web adapter 分支
const { Hono } = require('hono');

const app = new Hono();

app.get('/api/health', (c) => c.json({ ok: true, framework: 'hono' }));
app.get('/api/users/:id', (c) => c.json({ user: c.req.param('id'), source: 'hono' }));
app.post('/api/echo', async (c) => {
  const body = await c.req.json();
  return c.json({ received: body });
});

module.exports = app;
