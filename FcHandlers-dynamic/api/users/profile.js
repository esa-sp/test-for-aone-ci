// 静态路径，应优先于 [id]（priority: 静态 > 单段动态）
module.exports = (req, res) => res.end('profile');
