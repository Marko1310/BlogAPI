"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express router
const express_1 = require("express");
const router = (0, express_1.Router)();
// controller
const authController_1 = __importDefault(require("../controllers/authController"));
// Routes
// @route   POST /api/auth/register
// @desc    Create a new user
// @access  Public
router.post('/auth/register', authController_1.default.register);
// @route   POST /api/auth/login
// @desc    User log in
// @access  Public
router.post('/auth/login', authController_1.default.login);
exports.default = router;
