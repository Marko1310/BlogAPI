"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// User model
const user_1 = require("../models/user");
// Create user
const newUser = async (email, password, firstName, lastName) => {
    const userInput = {
        firstName,
        lastName,
        email,
        password,
    };
    const user = await user_1.User.create(userInput);
    return user;
};
exports.default = { newUser };
