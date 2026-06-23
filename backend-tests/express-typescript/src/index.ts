import express from 'express';
import path from 'path';
import { healthRouter } from './routes/health';
import { userRouter } from './routes/users';
import { configRouter } from './routes/config';

const app = express();
app.use(express.json());
// 编译产物在 dist/，静态文件在项目根 public/
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/health', healthRouter);
app.use('/api/users', userRouter);
app.use('/api/config', configRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default app;
