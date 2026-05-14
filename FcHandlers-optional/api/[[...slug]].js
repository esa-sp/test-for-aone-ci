// 末尾可选 catch-all：既能匹配 /api 本身，也能匹配 /api/<任意深度>
module.exports = {
  fetch(request) {
    const slug = new URL(request.url).searchParams.get('slug');
    return Response.json({ slug: slug || null });
  },
};
