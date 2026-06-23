// H3 + toNodeListener + http.listen 风格
const { createApp, createRouter, eventHandler, readBody, toNodeListener, setHeader } = require('h3');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = createApp();
const router = createRouter();

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript' };

// 手动 fs 读取静态文件（H3 无内置 static 中间件）
function serveStatic(filePath) {
  return eventHandler((event) => {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      setHeader(event, 'content-type', MIME[path.extname(filePath)] || 'text/plain');
      return data;
    } catch {
      event.node.res.statusCode = 404;
      return 'Not Found';
    }
  });
}

// 静态文件路由
router.get('/', serveStatic(path.join(__dirname, 'public', 'index.html')));
router.get('/style.css', serveStatic(path.join(__dirname, 'public', 'style.css')));

// API 路由
router.get('/api/health', eventHandler(() => ({
  ok: true, framework: 'h3', service: '边缘计数器', message: '服务运行中',
})));
router.get('/api/users/:id', eventHandler((event) => ({
  user: event.context.params.id, source: 'h3', name: `用户#${event.context.params.id}`,
})));
router.post('/api/echo', eventHandler(async (event) => ({
  received: await readBody(event), echoed: true, timestamp: new Date().toISOString(),
})));

app.use(router);

const port = process.env.PORT || 3000;
http.createServer(toNodeListener(app)).listen(port, () => {
  console.log(`listening on port ${port}`);
});
