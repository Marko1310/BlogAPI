"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services
const retrieveDataServices_1 = __importDefault(require("../services/retrieveDataServices"));
const blogServices_1 = __importDefault(require("../services/blogServices"));
const getAllUsers = async (req, res, next) => {
    try {
        const users = await retrieveDataServices_1.default.getAllUsers();
        res.status(200).json(users);
    }
    catch (err) {
        return next(err);
    }
};
const getRequestedPosts = async (req, res, next) => {
    try {
        const requestedPosts = await retrieveDataServices_1.default.getRequestedPosts();
        res.status(200).json(requestedPosts);
    }
    catch (err) {
        return next(err);
    }
};
const getPosts = async (req, res, next) => {
    try {
        // User is authenticated and role is admin
        if (req.user.role === 'admin') {
            const allPosts = await blogServices_1.default.findAllBlogs();
            res.status(200).json(allPosts);
        }
        // User is authenticated and role is blogger
        if (req.user.role === 'blogger') {
            const userPosts = await blogServices_1.default.findBlogByUserID(req.user.userId);
            res.status(200).json(userPosts);
        }
    }
    catch (err) {
        return next(err);
    }
};
exports.default = { getAllUsers, getRequestedPosts, getPosts };
