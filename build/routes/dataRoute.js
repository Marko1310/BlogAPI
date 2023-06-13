"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express router
const express_1 = require("express");
const router = (0, express_1.Router)();
// controller
const retrieveDataController_1 = __importDefault(require("../controllers/retrieveDataController"));
// middleware
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
// Routes
// @route   GET /api/auth/users
// @desc    Get all users
// @access  Private
router.get('/auth/users', authMiddleware_1.default.requireAuth, retrieveDataController_1.default.getAllUsers);
exports.default = router;
