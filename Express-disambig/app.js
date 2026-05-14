// 真正的 Express 入口
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('hello from app.js'));
module.exports = app;
