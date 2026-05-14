// 经典 Node 风格 handler
module.exports = (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ from: 'foo' }));
};
