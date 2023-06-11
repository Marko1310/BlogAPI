"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Controllers
const inputController_1 = __importDefault(require("./inputController"));
// services
const userServices_1 = __importDefault(require("../services/userServices"));
const register = async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        // basic input check
        inputController_1.default.isValidEmail(email);
        inputController_1.default.isValidPassword(password);
        inputController_1.default.isValidName(firstName, 'First name');
        inputController_1.default.isValidName(lastName, 'Last name');
        // create a new user
        const user = await userServices_1.default.newUser(email, password, firstName, lastName);
        res.json({
            user,
        });
    }
    catch (err) {
        return next(err);
    }
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // basic input check
        inputController_1.default.isValidEmail(email);
        inputController_1.default.isValidPassword(password);
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
