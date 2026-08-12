// Catch-all dynamic route — multi-segment [...slug]
module.exports = {
  fetch(request) {
    const slug = new URL(request.url).searchParams.get('slug');
    return Response.json({ slug });
  },
};
