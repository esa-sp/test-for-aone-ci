const fastify = require('fastify')({ logger: false });
const path = require('path');

// 静态文件托管（演示页）
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/',
});

// 手动注册各 plugin（模拟真实项目 register pattern）
fastify.register(require('./plugins/health'));
fastify.register(require('./plugins/users'), { prefix: '/api/users' });
fastify.register(require('./plugins/products'), { prefix: '/api/products' });

const port = process.env.PORT || 3000;
fastify.listen({ port: Number(port), host: '0.0.0.0' }, (err) => {
  if (err) { console.error(err); process.exit(1); }
  console.log(`listening on port ${port}`);
});
