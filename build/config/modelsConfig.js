"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const blog_1 = require("../models/blog");
const databaseConnection_1 = __importDefault(require("./databaseConnection"));
// Global Error handler
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
user_1.User.hasMany(blog_1.Blog, { foreignKey: 'userId' });
blog_1.Blog.belongsTo(user_1.User, { foreignKey: 'userId' });
const syncModels = async () => {
    try {
        await databaseConnection_1.default.authenticate();
        await user_1.User.sync({ alter: true });
        await blog_1.Blog.sync({ alter: true });
    }
    catch (err) {
        console.log('Error synchronizing models:', err);
        throw new appErrorServices_1.default('Database synchronization failed. Server cannot start.', 500);
    }
};
exports.default = syncModels;
