// Express router
import { Router } from 'express';

const router = Router();

// controller
import retrieveDataController from '../controllers/retrieveDataController';

// middleware
import authMiddleware from '../middleware/authMiddleware';

// Routes

// @route   GET /api/auth/users
// @desc    Get all users
// @access  Private
router.get(
  '/auth/users',
  authMiddleware.requireAuth,
  retrieveDataController.getAllUsers
);

export default router;
