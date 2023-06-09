"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//express router
const express_1 = require("express");
const router = (0, express_1.Router)();
// controller
const authController = require('../controllers/authController');
// routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
module.exports = router;
