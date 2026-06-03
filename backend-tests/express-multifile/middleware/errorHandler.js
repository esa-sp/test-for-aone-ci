/**
 * 全局错误处理中间件
 */
function errorHandler(err, req, res, _next) {
  console.error('[Error]', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
}

module.exports = { errorHandler };
