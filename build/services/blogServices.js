"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const blog_1 = require("../models/blog");
const user_1 = require("../models/user");
const createNewBlog = (title, content, userId, email, allowed) => {
    const blogInput = {
        title: title,
        content: content,
        userId: userId,
        author: email,
        allowed: allowed || false,
    };
    const blog = blog_1.Blog.create(blogInput);
    return blog;
};
const findAllBlogs = () => blog_1.Blog.findAll();
const findPublicBlogs = () => blog_1.Blog.findAll({
    where: { allowed: true },
    attributes: ['title', 'content'],
    include: [{ model: user_1.User, attributes: ['userName'] }],
});
const findBlogByBlogID = (blogId) => blog_1.Blog.findOne({ where: { blogId } });
const findBlogByUserID = (userId) => blog_1.Blog.findAll({ where: { userId } });
const allowBlog = (blogId) => blog_1.Blog.update({ allowed: true }, { where: { blogId } });
const declineBlog = (blogId) => blog_1.Blog.update({ allowed: false }, { where: { blogId } });
exports.default = {
    createNewBlog,
    findAllBlogs,
    findPublicBlogs,
    findBlogByBlogID,
    findBlogByUserID,
    allowBlog,
    declineBlog,
};
