"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express router
const express_1 = require("express");
const router = (0, express_1.Router)();
// controller
const blogController_1 = __importDefault(require("../controllers/blogController"));
// middleware
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
// routes
router.post('/auth/post', authMiddleware_1.default.requireAuth, blogController_1.default.postBlog);
exports.default = router;
