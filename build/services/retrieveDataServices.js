"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// User model
const user_1 = require("../models/user");
const getAllUsers = () => {
    return user_1.User.findAll({
        attributes: ['firstName', 'lastName'],
    });
};
exports.default = { getAllUsers };
