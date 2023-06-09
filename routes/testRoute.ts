import { Router, Request, Response } from 'express';

export const router = Router();

// routes
router.get('/', (req: Request, res: Response) => {
  res.status(200).json('Hello from the server');
});

export default router;
