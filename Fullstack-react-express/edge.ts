// ER 函数（Edge Routine），跑在 V8 isolate 里
// 平台按 esa.jsonc 的 edgeFunctionFirst 列表把指定路由路由到这里

export default {
  async fetch(request: Request): Promise<Response> {
    return handle(request);
  },
};

async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/edge/info')) {
    return Response.json({
      runtime: 'edge',
      pathname: url.pathname,
      search: url.search,
    });
  }

  if (url.pathname.startsWith('/promo/')) {
    return new Response('promo banner', {
      status: 200,
      headers: { 'cache-control': 'public, max-age=3600' },
    });
  }

  return new Response('hello from edge', { status: 200 });
}
