import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
  return res.json({ message: 'Welcome to Generator NodeJS API' });
});

export default routes;
