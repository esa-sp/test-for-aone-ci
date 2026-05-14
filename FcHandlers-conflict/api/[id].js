// 故意跟 [name].js 冲突：两者编译出同一个 PCRE pattern
module.exports = (req, res) => res.end('a');
