const express = require('express');
const path = require('path');
const { authMiddleware } = require('./middleware/auth');
const { errorHandler } = require('./middleware/errorHandler');
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');
const healthRoutes = require('./routes/health');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 路由注册
app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

// 全局错误处理中间件
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
