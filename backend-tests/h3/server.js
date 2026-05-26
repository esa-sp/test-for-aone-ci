// H3 + toNodeListener + http.listen 风格
const { createApp, createRouter, eventHandler, readBody, toNodeListener } = require('h3');
const http = require('http');

const app = createApp();
const router = createRouter();

router.get('/api/health', eventHandler(() => ({ ok: true, framework: 'h3' })));
router.get('/api/users/:id', eventHandler((event) => ({
  user: event.context.params.id,
  source: 'h3',
})));
router.post('/api/echo', eventHandler(async (event) => ({
  received: await readBody(event),
})));

app.use(router);

http.createServer(toNodeListener(app)).listen(8080, () => {
  console.log('h3 user-listen-cb on 8080');
});
