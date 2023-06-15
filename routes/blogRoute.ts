// Express router
import { Router } from 'express';

const router = Router();

// controller
import blogController from '../controllers/blogController';

// middleware
import authMiddleware from '../middleware/authMiddleware';

// Routes

// @route   POST /api/auth/post
// @desc    Create a new blog
// @access  Private
// @role    Admin, Blogger, User
router.post('/auth/post', authMiddleware.requireAuth, blogController.postBlog);

// @route   POST /api/auth/post-request
// @desc    Admin allow/decline the post
// @access  Private
// @role    Admin
router.post(
  '/auth/post-request',
  authMiddleware.requireAuth,
  authMiddleware.restrictTo('admin'),
  blogController.allowDeclinePost
);

export default router;
