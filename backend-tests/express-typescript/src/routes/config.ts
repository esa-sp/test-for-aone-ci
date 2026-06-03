import { Router, Request, Response } from 'express';

export const configRouter = Router();

interface AppConfig {
  env: string;
  version: string;
  features: string[];
}

const config: AppConfig = {
  env: process.env.NODE_ENV || 'test',
  version: '1.0.0',
  features: ['users', 'items', 'health'],
};

configRouter.get('/', (_req: Request, res: Response) => {
  res.json(config);
});
