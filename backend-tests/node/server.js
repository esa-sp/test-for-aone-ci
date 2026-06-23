// 纯 Node http，无任何后端框架
// framework-checker 的 "node" 兜底 slug：package.json 存在 + server.{js,...} 存在
const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript' };

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');

  // 手动 fs 静态文件
  if (url.pathname === '/' || url.pathname === '/style.css') {
    const fileName = url.pathname === '/' ? 'index.html' : 'style.css';
    const filePath = path.join(__dirname, 'public', fileName);
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      res.statusCode = 200;
      res.setHeader('content-type', MIME[path.extname(fileName)] || 'text/plain');
      return res.end(data);
    } catch {
      res.statusCode = 404;
      return res.end('Not Found');
    }
  }

  if (url.pathname === '/api/health') {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    return res.end(JSON.stringify({ ok: true, framework: 'node', service: '原生路由', message: '服务运行中' }));
  }

  const userMatch = url.pathname.match(/^\/api\/users\/([^/]+)$/);
  if (userMatch) {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    return res.end(JSON.stringify({ user: userMatch[1], source: 'node', name: `用户#${userMatch[1]}` }));
  }

  if (req.method === 'POST' && url.pathname === '/api/echo') {
    let buf = '';
    req.on('data', (c) => (buf += c.toString()));
    req.on('end', () => {
      res.statusCode = 200;
      res.setHeader('content-type', 'application/json');
      let parsed;
      try { parsed = JSON.parse(buf); } catch { parsed = buf; }
      res.end(JSON.stringify({ received: parsed, echoed: true, timestamp: new Date().toISOString() }));
    });
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));
