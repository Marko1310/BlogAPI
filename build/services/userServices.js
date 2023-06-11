"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// User model
const user_1 = __importDefault(require("../models/user"));
// Create user
const newUser = async function (email, password, firstName, lastName) {
    return user_1.default.create({
        firstName,
        lastName,
        email,
        password,
    });
};
exports.default = {
    newUser,
};
