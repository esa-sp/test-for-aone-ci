const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('hello from express-export fixture'));

// 故意 export-only：没有 app.listen()，由 backend-runtime 的 start.js
// 走"导出函数 → 直接 createServer"那条派发路径
module.exports = app;
