// 末尾贪婪 catch-all [...slug]
module.exports = {
  fetch(request) {
    const slug = new URL(request.url).searchParams.get('slug');
    return Response.json({ slug });
  },
};
