"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Controllers
const inputController_1 = __importDefault(require("./inputController"));
// services
const blogServices_1 = __importDefault(require("../services/blogServices"));
const userServices_1 = __importDefault(require("../services/userServices"));
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
const postBlog = async (req, res, next) => {
    const { userId, email, role } = req.user;
    const { title, content } = req.body;
    try {
        inputController_1.default.isValidBlogTitle(title);
        inputController_1.default.isValidBlogContent(content);
        let newBlog;
        if (role === 'admin') {
            newBlog = await blogServices_1.default.createNewBlog(title, content, userId, email, true);
        }
        else {
            newBlog = await blogServices_1.default.createNewBlog(title, content, userId, email);
        }
        res.status(200).json(newBlog);
    }
    catch (err) {
        return next(err);
    }
};
const allowDeclinePost = async (req, res, next) => {
    const { blogId, action } = req.body;
    try {
        // retrieve blog and associated user
        const blog = await blogServices_1.default.findBlogByBlogID(blogId);
        let user = null;
        if (blog) {
            user = await blog.getUser();
        }
        else {
            throw new appErrorServices_1.default(`There is no blog (blogId: ${blogId})`, 404);
        }
        // depending on the action
        if (action === 'allow' && user) {
            await blogServices_1.default.allowBlog(blogId);
            if (user.role !== 'admin') {
                await userServices_1.default.changeUserRole(user.userId, 'blogger');
            }
            res.status(200).json(`Blog (blogId: ${blog?.blogId}) is allowed`);
        }
        else if (action === 'decline' && user) {
            await blogServices_1.default.declineBlog(blogId);
            res.status(200).json(`Blog (blogId: ${blog?.blogId}) is declined`);
        }
        else {
            throw new appErrorServices_1.default(`Invalid action: (${action}), please provide type of 'allow' or 'decline'`, 400);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.default = { postBlog, allowDeclinePost };
