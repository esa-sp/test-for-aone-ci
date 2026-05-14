// 单段动态参数 [id]
module.exports = (req, res) => {
  const id = new URL(req.url, 'http://x').searchParams.get('id');
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ user: id }));
};
