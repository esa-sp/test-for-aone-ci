// Elysia + Web fetch handler 风格（node adapter）
// 默认 Elysia 是给 bun 用的；@elysiajs/node 让它在 Node 上跑（提供 listen 适配）
const { Elysia } = require('elysia');
const { node } = require('@elysiajs/node');
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

const app = new Elysia({ adapter: node() })
  // 静态文件托管（通配路由，优先级低于精确匹配的 API 路由）
  .get('/*', ({ params }) => {
    let fileParam = params['*'] || '';
    if (fileParam === '' || fileParam.endsWith('/')) {
      fileParam += 'index.html';
    }
    const filePath = path.join(publicDir, fileParam);
    if (!filePath.startsWith(publicDir)) {
      return new Response('Not Found', { status: 404 });
    }
    try {
      const data = fs.readFileSync(filePath);
      return new Response(data, {
        headers: { 'content-type': MIME[path.extname(filePath)] || 'text/plain; charset=utf-8' },
      });
    } catch {
      return new Response('Not Found', { status: 404 });
    }
  })
  // derive — Elysia 特色：类型安全地注入请求级上下文
  .derive(() => ({ requestTime: new Date().toISOString() }))
  .get('/api/health', ({ requestTime }) => ({ ok: true, framework: 'elysia', service: '类型安全表单', message: '服务运行中', requestTime }))
  .get('/api/users/:id', ({ params }) => ({ user: params.id, source: 'elysia', name: `用户#${params.id}` }))
  .post('/api/echo', ({ body }) => ({ received: body, echoed: true, timestamp: new Date().toISOString() }));

// 本地独立运行：node app.js
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`listening on port ${port}`);
}

// app.fetch: (Request) => Response
module.exports = { fetch: app.fetch };
