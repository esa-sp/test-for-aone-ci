const fastify = require('fastify')();

fastify.get('/', async () => ({ hello: 'fastify' }));

fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err;
});
