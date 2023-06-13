"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const databaseConnection_1 = __importDefault(require("../config/databaseConnection"));
const user_1 = require("./user"); // Import the User model
const sequelize_1 = require("sequelize");
class Blog extends sequelize_1.Model {
}
exports.Blog = Blog;
Blog.init({
    blogId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    allowed: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'notAllowed',
        validate: {
            isIn: {
                args: [['notAllowed', 'allowed']],
                msg: 'Invalid allowed value',
            },
        },
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: databaseConnection_1.default,
    modelName: 'Blog',
    timestamps: true,
});
Blog.belongsTo(user_1.User, {
    foreignKey: 'userId',
});
