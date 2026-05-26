// Koa + app.listen 风格
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

router.get('/api/health', (ctx) => {
  ctx.body = { ok: true, framework: 'koa' };
});

router.get('/api/users/:id', (ctx) => {
  ctx.body = { user: ctx.params.id, source: 'koa' };
});

router.post('/api/echo', (ctx) => {
  ctx.body = { received: ctx.request.body };
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => console.log('koa user-listen-cb on 8080'));
