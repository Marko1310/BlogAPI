// Express router
import { Router } from 'express';

const router = Router();

// controller
import blogController from '../controllers/blogController';

// middleware
import authMiddleware from '../middleware/authMiddleware';

// routes
router.post('/auth/post', authMiddleware.requireAuth, blogController.postBlog);

export default router;
