// Express router
import { Router } from 'express';

const router = Router();

// controller
import blogController from '../controllers/blogController';

// middleware
import authMiddleware from '../middleware/authMiddleware';

// routes

// @route   POST /api/auth/post
// @desc    Create a new blog
// @access  Private
// @role    Admin, Blogger, User
router.post('/auth/post', authMiddleware.requireAuth, blogController.postBlog);

export default router;
