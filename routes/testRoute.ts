import { Router, Request, Response } from 'express';

const router = Router();

// routes
router.get('/', (req: Request, res: Response) => {
  res.status(200).json('Hello from the server');
});

module.exports = router;
