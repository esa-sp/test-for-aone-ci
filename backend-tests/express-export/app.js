// Express + module.exports = app（无 listen）
// start.mjs unwrapDefault 后看到函数，包进 http.createServer 自己 listen
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// asyncHandler — Express 异步路由包装，自动捕获 Promise rejection
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, framework: 'express', flavor: 'export', service: '留言板', message: '服务运行中' });
});

app.get('/api/users/:id', asyncHandler(async (req, res) => {
  res.json({ user: req.params.id, source: 'express-export', name: `访客#${req.params.id}`, avatar: `/avatars/${req.params.id}.png` });
}));

app.post('/api/echo', (req, res) => {
  res.json({ received: req.body, echoed: true, timestamp: new Date().toISOString() });
});

// 全局错误处理中间件
app.use((err, req, res, _next) => {
  console.error('[Error]', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// 本地独立运行：node app.js（对比 express-listen 的 app.listen 风格）
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
}

module.exports = app;
