// Named HTTP method style handler — TypeScript version
// Tests FC handler TS precompile: esbuild transforms .ts → .js before fc-bundle scan
exports.GET = (): Response => Response.json({ list: [] });
exports.POST = (): Response => Response.json({ created: true }, { status: 201 });
