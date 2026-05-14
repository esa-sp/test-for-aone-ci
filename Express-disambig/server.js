// 这个文件**故意不 import express**，只是个看起来像入口的诱饵。
// 在 framework-checker 的 inferEntry 里，server.js 排在 COMMON_ENTRY_NAMES 第一位，
// 朴素逻辑会先选它。但 import regex 校验后，它会被识别为"未 import 框架"而跳过，
// 真正的入口由 app.js 接管。
const http = require('http');
http.createServer((req, res) => res.end('decoy server.js')).listen(0);
