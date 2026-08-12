// Web fetch style handler — TypeScript version
// Tests FC handler TS precompile: esbuild transforms .ts → .js before fc-bundle scan
module.exports = {
  fetch(request: Request): Response {
    return Response.json({ ok: true });
  }
};
