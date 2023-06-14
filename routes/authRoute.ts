// Express router
import { Router } from 'express';

const router = Router();

// controller
import authController from '../controllers/authController';

// Routes

// @route   POST /api/auth/register
// @desc    Create a new user
// @access  Public
// @role    /
router.post('/auth/register', authController.register);

// @route   POST /api/auth/login
// @desc    User log in
// @access  Public
// @role    /
router.post('/auth/login', authController.login);

export default router;
