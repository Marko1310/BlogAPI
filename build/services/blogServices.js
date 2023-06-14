"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Blog model
const blog_1 = require("../models/blog");
const createNewBlog = (title, content, userId, email) => {
    const blogInput = {
        title: title,
        content: content,
        userId: userId,
        author: email,
    };
    const blog = blog_1.Blog.create(blogInput);
    return blog;
};
const allowDeclinePost = (blogId, action) => {
    return true;
};
const findBlogbyID = (blogId) => blog_1.Blog.findOne({ where: { blogId } });
const allowBlog = (blogId) => blog_1.Blog.update({ allowed: true }, { where: { blogId } });
exports.default = { createNewBlog, allowDeclinePost, findBlogbyID, allowBlog };