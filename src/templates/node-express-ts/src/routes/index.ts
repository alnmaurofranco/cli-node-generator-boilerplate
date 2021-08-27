import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  return res.json({ message: 'Welcome to Generator NodeJS API' });
});

export { router };
