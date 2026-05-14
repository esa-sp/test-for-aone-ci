// Web Service Worker 风格 { fetch }
module.exports = {
  fetch(request) {
    return Response.json({ ok: true });
  },
};
