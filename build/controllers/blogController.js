"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Controllers
const inputController_1 = __importDefault(require("./inputController"));
// services
const blogServices_1 = __importDefault(require("../services/blogServices"));
const postBlog = async (req, res, next) => {
    const { userId, email } = req.user;
    const { title, content } = req.body;
    try {
        inputController_1.default.isValidBlogTitle(title);
        inputController_1.default.isValidBlogContent(content);
        const newBlog = await blogServices_1.default.createNewBlog(title, content, userId, email);
        res.status(200).json(newBlog);
    }
    catch (err) {
        return next(err);
    }
};
exports.default = { postBlog };
