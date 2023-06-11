"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const databaseConnection_1 = __importDefault(require("../config/databaseConnection"));
const User = databaseConnection_1.default.define('user', {
    userId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', value.toLowerCase());
        },
        validate: {
            isEmail: {
                msg: 'Please provide a valid email address',
            },
            notNull: {
                msg: 'Please provide a valid email address',
            },
            notEmpty: {
                msg: 'Please provide a valid email address',
            },
        },
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, Infinity],
                msg: 'Password should be at least 6 characters long',
            },
        },
    },
    firstName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide first name',
            },
            notEmpty: {
                msg: 'First name cannot be empty',
            },
        },
    },
    lastName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide last name',
            },
            notEmpty: {
                msg: 'Last name cannot be empty',
            },
        },
    },
}, {
    timestamps: false,
});
exports.default = User;
