// Express router
import { Router } from 'express';

const router = Router();

// controller
import retrieveDataController from '../controllers/retrieveDataController';

// middleware
import authMiddleware from '../middleware/authMiddleware';
import publicMiddleware from '../middleware/publicMiddleware';

// Routes

// @route   GET /api/auth/users
// @desc    Get all users
// @access  Private
// @role    Admin, Blogger, User
router.get('/auth/users', authMiddleware.requireAuth, retrieveDataController.getAllUsers);

// @route   GET /api/auth/post-request
// @desc    Get requested posts (not allowed posts)
// @access  Private
// @role    Admin
router.get(
  '/auth/post-request',
  authMiddleware.requireAuth,
  authMiddleware.restrictTo('admin'),
  retrieveDataController.getRequestedPosts
);

// @route   GET /api/posts
// @desc    Get posts depending on roles
// @access  Public/Private
// @role    Admin/Blogger/User/Unauthenticated

router.get(
  '/posts',
  publicMiddleware.allowPublicAccess,
  authMiddleware.requireAuth,
  authMiddleware.restrictTo('admin', 'blogger'),
  retrieveDataController.getPosts
);

export default router;
