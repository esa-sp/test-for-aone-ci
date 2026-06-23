import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.json({ ok: true, framework: 'express', lang: 'typescript', service: '配置中心', message: '服务运行中' });
});
