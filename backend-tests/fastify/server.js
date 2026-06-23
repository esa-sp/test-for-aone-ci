// Fastify + listen 风格
// 演示：response schema 校验（Fastify 杀手锏）+ @fastify/static 静态托管
const Fastify = require('fastify');
const path = require('path');

const app = Fastify({ logger: false });

// 静态文件托管（find-my-way 按特异性匹配，/api/* 优先于通配 /*）
app.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/',
});

// 健康检查 · response schema 自动校验与快速序列化
app.get('/api/health', {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          ok: { type: 'boolean' },
          framework: { type: 'string' },
          service: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
}, async () => ({ ok: true, framework: 'fastify', service: '商品搜索', message: '服务运行中' }));

// 店主信息 · params + response schema
app.get('/api/users/:id', {
  schema: {
    params: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
    response: {
      200: {
        type: 'object',
        properties: {
          user: { type: 'string' },
          source: { type: 'string' },
          name: { type: 'string' },
          shop: { type: 'string' },
        },
      },
    },
  },
}, async (req) => ({
  user: req.params.id,
  source: 'fastify',
  name: `店主#${req.params.id}`,
  shop: `店铺-${req.params.id}`,
}));

// 搜索预览回显 · 回显动态 body，不套 response schema（fast-json-stringify 会过滤未声明字段）
app.post('/api/echo', async (req) => ({ received: req.body, echoed: true, timestamp: new Date().toISOString() }));

// 商品搜索 · querystring schema 自动类型转换（Fastify 特色）
app.get('/api/products', {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        keyword: { type: 'string' },
        page: { type: 'integer', default: 1 },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          keyword: { type: 'string' },
          page: { type: 'integer' },
          total: { type: 'integer' },
          items: { type: 'array' },
        },
      },
    },
  },
}, async (req) => {
  const { keyword, page } = req.query;
  return {
    keyword: keyword || '',
    page: page || 1,
    total: 3,
    items: [
      { id: 1, name: `${keyword || '商品'}-A`, price: 99 },
      { id: 2, name: `${keyword || '商品'}-B`, price: 199 },
      { id: 3, name: `${keyword || '商品'}-C`, price: 299 },
    ],
  };
});

// Fastify listen 是 Promise；平台拦截 http.Server.listen 改写端口
const port = process.env.PORT || 3000;
app.listen({ port: Number(port), host: '0.0.0.0' }).then(() => {
  console.log(`listening on port ${port}`);
});
