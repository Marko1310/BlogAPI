"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// User model
const user_1 = require("../models/user");
const getAllUsers = async (req, res, next) => {
    try {
        const users = await user_1.User.findAll({
            attributes: ['firstName', 'lastName'],
        });
        res.status(200).json(users);
    }
    catch (err) {
        return next(err);
    }
};
exports.default = { getAllUsers };
