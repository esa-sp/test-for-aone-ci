/**
 * 简单的 API Key 认证中间件
 */
function authMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== 'test-key') {
    return res.status(401).json({ error: 'unauthorized' });
  }
  req.user = { role: 'admin' };
  next();
}

module.exports = { authMiddleware };
