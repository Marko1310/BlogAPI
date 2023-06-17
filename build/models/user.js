"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const databaseConnection_1 = __importDefault(require("../config/databaseConnection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', value.toLowerCase());
        },
        validate: {
            isEmail: { msg: 'Please provide a valid email address' },
            notNull: { msg: 'Please provide a valid email address' },
            notEmpty: { msg: 'Please provide a valid email address' },
        },
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Please provide a valid user name' },
            notEmpty: { msg: 'Please provide a valid user name' },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, Infinity],
                msg: 'Password should be at least 6 characters long',
            },
        },
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Please provide first name' },
            notEmpty: { msg: 'First name cannot be empty' },
        },
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Please provide last name' },
            notEmpty: { msg: 'Last name cannot be empty' },
        },
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'user',
        allowNull: false,
        validate: {
            isIn: {
                args: [['user', 'blogger', 'admin']],
                msg: 'Invalid permission value',
            },
        },
    },
}, {
    sequelize: databaseConnection_1.default,
    modelName: 'User',
    timestamps: false,
});
User.beforeCreate(async (user) => {
    const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
    user.password = hashedPassword;
});
