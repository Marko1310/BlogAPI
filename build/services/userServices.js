"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// User model
const user_1 = require("../models/user");
// Create user
const newUser = (email, password, firstName, lastName) => {
    const userInput = {
        firstName,
        lastName,
        email,
        password,
    };
    const user = user_1.User.create(userInput);
    return user;
};
// Find users
const findUser = (userId) => user_1.User.findOne({ where: { userId } });
const findUserbyEmail = (email) => user_1.User.findOne({ where: { email } });
exports.default = { newUser, findUser, findUserbyEmail };
