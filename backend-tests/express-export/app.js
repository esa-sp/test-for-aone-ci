// Express + module.exports = app（无 listen）
// start.mjs unwrapDefault 后看到函数，包进 http.createServer 自己 listen
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, framework: 'express', flavor: 'export' });
});

app.get('/api/users/:id', (req, res) => {
  res.json({ user: req.params.id, source: 'express-export' });
});

app.post('/api/echo', (req, res) => {
  res.json({ received: req.body });
});

module.exports = app;
