const { UserService } = require('../services/userService');

async function usersPlugin(fastify) {
  const svc = new UserService();

  fastify.get('/:id', async (request) => {
    return svc.findById(request.params.id);
  });

  fastify.post('/', async (request, reply) => {
    const user = svc.create(request.body);
    reply.code(201);
    return user;
  });
}

module.exports = usersPlugin;
