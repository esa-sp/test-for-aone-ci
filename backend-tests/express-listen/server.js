// Express + app.listen 风格
// 用户写 listen(8080)，start.mjs 会拦截并改用 manifest.port (=3000)
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, framework: 'express', flavor: 'listen' });
});

app.get('/api/users/:id', (req, res) => {
  res.json({ user: req.params.id, source: 'express' });
});

app.post('/api/echo', (req, res) => {
  res.json({ received: req.body });
});

app.listen(8080, () => console.log('user-listen-cb on port 8080 (will be intercepted)'));
