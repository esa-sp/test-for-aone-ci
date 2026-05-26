module.exports = (appInfo) => {
  return {
    keys: appInfo.name + '_backend_test_keys',
    security: {
      csrf: { enable: false },
    },
    cluster: {
      // 把 worker 数压到 1，避免 backend-test 在低配 runner 上拉 cluster 太重
      listen: {
        port: parseInt(process.env.PORT, 10) || 7001,
        hostname: '127.0.0.1',
      },
    },
    // 关闭 onerror 的 HTML 错误页（测试时用 JSON 简单的 body 更好断言）
    onerror: {
      all(err, ctx) {
        ctx.status = 500;
        ctx.body = JSON.stringify({ error: err.message });
      },
    },
  };
};
