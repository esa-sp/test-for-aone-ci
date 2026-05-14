// 命名 HTTP method 导出（Web Standard route handler 风格）
exports.GET = () => Response.json({ list: [] });
exports.POST = () => Response.json({ created: true }, { status: 201 });
