"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const databaseConnection_1 = __importDefault(require("../config/databaseConnection"));
const user_1 = __importDefault(require("./user")); // Import the User model
const Blog = databaseConnection_1.default.define('blog', {
    blogId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    author: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    allowed: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});
Blog.belongsTo(user_1.default, {
    foreignKey: 'userId',
});
exports.default = Blog;
