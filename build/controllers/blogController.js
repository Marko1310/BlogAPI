"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogServices_1 = __importDefault(require("../services/blogServices"));
const postBlog = async (req, res, next) => {
    const { userId, email } = req.user;
    const { title, content } = req.body;
    try {
        // Basic checks for title, content length
        //
        ///////
        const newBlog = await blogServices_1.default.createNewBlog(title, content, userId, email);
        res.json(newBlog);
    }
    catch (err) {
        return next(err);
    }
};
exports.default = { postBlog };
