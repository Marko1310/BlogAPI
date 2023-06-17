"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const user_1 = require("../models/user");
const blog_1 = require("../models/blog");
const getAllUsers = (role) => {
    if (role === 'admin') {
        return user_1.User.findAll();
    }
    else {
        return user_1.User.findAll({ attributes: ['userName'] });
    }
};
const getRequestedPosts = () => blog_1.Blog.findAll({
    where: {
        allowed: false,
    },
});
exports.default = { getAllUsers, getRequestedPosts };
