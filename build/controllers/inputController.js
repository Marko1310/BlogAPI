"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Global Error handler
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
// regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /^[A-Za-z]{2,}$/;
// Input validator functions
const isValidEmail = (email) => {
    if (email.length === 0 || emailRegex.test(email) === false) {
        throw new appErrorServices_1.default('Please provide a valid email address', 400);
    }
};
const isValidPassword = (password) => {
    if (password.length < 6) {
        throw new appErrorServices_1.default('Password should be at least 6 characters long', 400);
    }
};
const isValidName = (name, fieldName) => {
    if (name.length === 0) {
        throw new appErrorServices_1.default(`${fieldName} cannot be empty`, 400);
    }
    if (nameRegex.test(name) === false) {
        throw new appErrorServices_1.default(`Not a valid ${fieldName}`, 400);
    }
};
const isValidBlogTitle = (title) => {
    if (title.length === 0) {
        throw new appErrorServices_1.default(`Title cannot be empty`, 400);
    }
};
const isValidBlogContent = (content) => {
    if (content.length === 0) {
        throw new appErrorServices_1.default(`Content cannot be empty`, 400);
    }
};
exports.default = {
    isValidEmail,
    isValidPassword,
    isValidName,
    isValidBlogTitle,
    isValidBlogContent,
};
