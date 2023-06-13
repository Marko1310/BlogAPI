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
exports.default = { createNewBlog };
