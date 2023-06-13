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
// middleware
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
// routes
router.post('/auth/register', authController_1.default.register);
router.post('/auth/login', authController_1.default.login);
router.post('/auth/test', authMiddleware_1.default.requireAuth, authController_1.default.login);
exports.default = router;
