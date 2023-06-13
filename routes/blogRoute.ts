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
router.post('/auth/post', authMiddleware.requireAuth, blogController.postBlog);

export default router;
