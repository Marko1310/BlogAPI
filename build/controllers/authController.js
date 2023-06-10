"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Global Error handler
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
const register = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        res.json({
            email,
            password,
            firstName,
            lastName,
        });
    }
    catch (err) {
        console.log(err);
    }
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (password.length < 6) {
            throw new appErrorServices_1.default('bbb', 400);
        }
        res.json({
            email,
            password,
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.default = {
    register,
    login,
};
