// Express router
import { Router } from 'express';

const router = Router();

// controller
const authController = require('../controllers/authController');

// routes
router.post('/auth/register', authController.register);

router.post('/auth/login', authController.login);

export default router;
