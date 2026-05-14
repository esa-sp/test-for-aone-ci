const { Hono } = require('hono');

const app = new Hono();
app.get('/', (c) => c.text('hello from hono-app fixture'));

// Hono 风格：app 实例本身就是 { fetch } 对象，导出后由 backend-runtime 的 Web adapter 调用
module.exports = app;
