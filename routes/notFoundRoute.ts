// Express router
import { Router } from 'express';

const router = Router();

// controller
import notFoundController from '../controllers/notFoundController';

// routes
router.all('*', notFoundController.notFound);

export default router;
