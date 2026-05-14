const Koa = require('koa');

const app = new Koa();
app.use(async (ctx) => {
  ctx.body = 'hello from koa-app fixture';
});

// Koa 风格：app.callback() 是 (req,res) handler；这里用 listen 让 start.js 走捕获分支
app.listen(3000);
