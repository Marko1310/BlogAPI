// Express router
import { Router } from 'express';

const router = Router();

// controller
import authController from '../controllers/authController';

// middleware
import authMiddleware from '../middleware/authMiddleware';

// routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
// router.post('/auth/test', authMiddleware.requireAuth, authController.login);

export default router;
