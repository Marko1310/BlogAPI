"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const user_1 = require("../models/user");
const blog_1 = require("../models/blog");
const getAllUsers = () => {
    return user_1.User.findAll({
        attributes: ['firstName', 'lastName'],
    });
};
const getRequestedPosts = () => {
    return blog_1.Blog.findAll({
        where: {
            allowed: false,
        },
    });
};
exports.default = { getAllUsers, getRequestedPosts };
