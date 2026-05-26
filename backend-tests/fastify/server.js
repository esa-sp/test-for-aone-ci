// Fastify + listen 风格
const Fastify = require('fastify');

const app = Fastify({ logger: false });

app.get('/api/health', async () => ({ ok: true, framework: 'fastify' }));

app.get('/api/users/:id', async (req) => ({ user: req.params.id, source: 'fastify' }));

app.post('/api/echo', async (req) => ({ received: req.body }));

// Fastify listen 是 Promise；start.mjs 的 listen 拦截装在 http.Server.prototype 上
// fastify 内部最终也走 http.Server.listen → 会被拦截
app.listen({ port: 8080, host: '127.0.0.1' }).then(() => {
  console.log('fastify user-listen-cb on 8080');
});
