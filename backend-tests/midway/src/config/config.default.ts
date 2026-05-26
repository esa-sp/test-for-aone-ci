export default {
  keys: 'midway-backend-test-keys',
  koa: {
    port: parseInt(process.env.PORT || '7001', 10),
    hostname: '127.0.0.1',
  },
};
