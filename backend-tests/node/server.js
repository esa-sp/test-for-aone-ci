// 纯 Node http，无任何后端框架
// framework-checker 的 "node" 兜底 slug：package.json 存在 + server.{js,...} 存在
const http = require('http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');

  if (url.pathname === '/api/health') {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    return res.end(JSON.stringify({ ok: true, framework: 'node' }));
  }

  const userMatch = url.pathname.match(/^\/api\/users\/([^/]+)$/);
  if (userMatch) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    return res.end(JSON.stringify({ user: userMatch[1], source: 'node' }));
  }

  if (req.method === 'POST' && url.pathname === '/api/echo') {
    let buf = '';
    req.on('data', (c) => (buf += c.toString()));
    req.on('end', () => {
      res.statusCode = 200;
      res.setHeader('content-type', 'application/json');
      let parsed;
      try { parsed = JSON.parse(buf); } catch { parsed = buf; }
      res.end(JSON.stringify({ received: parsed }));
    });
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
});

server.listen(8080, () => console.log('node user-listen-cb on 8080'));
