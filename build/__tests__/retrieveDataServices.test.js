"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const retrieveDataServices_1 = __importDefault(require("../services/retrieveDataServices"));
const user_1 = require("../models/user");
const blog_1 = require("../models/blog");
test('it should call User.findAll once', async () => {
    user_1.User.findAll = jest.fn();
    await retrieveDataServices_1.default.getAllUsers('admin');
    expect(user_1.User.findAll).toHaveBeenCalled();
    expect(user_1.User.findAll).toHaveBeenCalledTimes(1);
});
test('it should call Blog.findAll once', async () => {
    blog_1.Blog.findAll = jest.fn();
    await retrieveDataServices_1.default.getRequestedPosts();
    expect(blog_1.Blog.findAll).toHaveBeenCalled();
    expect(blog_1.Blog.findAll).toHaveBeenCalledTimes(1);
});
