"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dependencies
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
// create token
const createToken = (userId, maxAge) => {
    jsonwebtoken_1.default.sign({ userId }, jwtSecret, { expiresIn: maxAge });
};
exports.default = { createToken };
