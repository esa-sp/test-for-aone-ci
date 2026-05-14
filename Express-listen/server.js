const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('hello from express-listen fixture'));

// 故意写成 listen 风格 + 用户自己声明的端口
// backend-runtime 的 start.js 会拦截这个 listen 调用，由 manifest.port 接管
app.listen(8080, () => console.log('user-listen-cb on port 8080'));
