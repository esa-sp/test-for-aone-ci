// Named HTTP method style handler
exports.GET = () => Response.json({ list: [] });
exports.POST = () => Response.json({ created: true }, { status: 201 });
