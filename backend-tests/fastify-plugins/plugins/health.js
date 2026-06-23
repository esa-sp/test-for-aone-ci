async function healthPlugin(fastify) {
  fastify.get('/api/health', async () => {
    return { ok: true, framework: 'fastify', plugins: true, service: '多插件注册', message: '服务运行中' };
  });
}

module.exports = healthPlugin;
