"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services
const blogServices_1 = __importDefault(require("../services/blogServices"));
const allowPublicAccess = async (req, res, next) => {
    try {
        // User is not authenticated
        if (!req.headers.authorization) {
            const publicPosts = await blogServices_1.default.findPublicBlogs();
            res.status(200).json(publicPosts);
            return;
        }
        else {
            next();
        }
    }
    catch (err) {
        next(err);
    }
};
exports.default = { allowPublicAccess };
