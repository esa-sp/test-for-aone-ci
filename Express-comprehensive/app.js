// 真正的 Express 入口——合并了三个边缘场景：
// 1. 入口消歧：server.js 是诱饵，app.js 才是真正的框架入口
// 2. 框架优先于 FC handlers：/api/foo.js 存在但应由 Express router 处理
// 3. views/ 模板自动追踪：设置 view engine 后 nft 会追踪模板文件
const path = require('path');
const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => res.render('home', { name: 'world' }));
app.get('/api/foo', (req, res) => res.json({ from: 'express' }));

app.listen(3000);
