import express from 'express';
import { healthRouter } from './routes/health';
import { userRouter } from './routes/users';
import { configRouter } from './routes/config';

const app = express();
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/users', userRouter);
app.use('/api/config', configRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default app;
