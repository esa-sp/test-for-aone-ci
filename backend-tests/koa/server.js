// Koa + app.listen 风格
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
const router = new Router();

// 洋葱模型中间件 — 访问日志（Koa 特色：ctx 级联）
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} ${ctx.status} ${ms}ms`);
});

// 静态文件托管
app.use(serve(path.join(__dirname, 'public')));

router.get('/api/health', (ctx) => {
  ctx.body = { ok: true, framework: 'koa', service: '访问日志', message: '服务运行中' };
});

router.get('/api/users/:id', (ctx) => {
  ctx.body = { user: ctx.params.id, source: 'koa', name: `用户#${ctx.params.id}`, role: 'viewer' };
});

router.post('/api/echo', (ctx) => {
  ctx.body = { received: ctx.request.body, echoed: true, timestamp: new Date().toISOString() };
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
