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
// routes
router.post('/auth/register', authController_1.default.register);
router.post('/auth/login', authController_1.default.login);
// router.post('/auth/test', authMiddleware.requireAuth, authController.login);
exports.default = router;
