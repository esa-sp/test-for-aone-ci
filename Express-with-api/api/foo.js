// 即使存在 /api/ 下的 handler，因为后端框架（Express）已被探测到，
// TestStep 应当走 packBackendFramework 分支而不是 packFcHandlers
// （由 Express router 自己来处理 /api/* 路由）
module.exports = (req, res) => res.end('this should NOT be reached by fc dispatcher');
