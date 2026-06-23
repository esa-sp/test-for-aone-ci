import { Router, Request, Response } from 'express';

interface User {
  id: number;
  name: string;
  email?: string;
}

const users: Map<number, User> = new Map();

export const userRouter = Router();

userRouter.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.get(id) || { id, name: `user-${id}` };
  res.json({ ...user, source: 'express-typescript' });
});

userRouter.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  const id = Date.now();
  const user: User = { id, name, email };
  users.set(id, user);
  res.status(201).json(user);
});
