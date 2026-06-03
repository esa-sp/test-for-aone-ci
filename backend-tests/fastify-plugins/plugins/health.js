async function healthPlugin(fastify) {
  fastify.get('/api/health', async () => {
    return { ok: true, framework: 'fastify', plugins: true };
  });
}

module.exports = healthPlugin;
