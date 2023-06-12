"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services
const userServices_1 = __importDefault(require("../services/userServices"));
const jwtServices_1 = __importDefault(require("../services/jwtServices"));
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
const bcryptServices_1 = __importDefault(require("../services/bcryptServices"));
const register = async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        // basic input check
        // inputValidateController.isValidEmail(email);
        // inputValidateController.isValidPassword(password);
        // inputValidateController.isValidName(firstName, 'First name');
        // inputValidateController.isValidName(lastName, 'Last name');
        // create a new user
        const user = await userServices_1.default.newUser(email, password, firstName, lastName);
        // create and send token
        jwtServices_1.default.sendJwtResponse(user, res);
    }
    catch (err) {
        return next(err);
    }
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userServices_1.default.findUserbyEmail(email);
        if (user) {
            const authenticated = await bcryptServices_1.default.checkPassword(password, user);
            if (authenticated) {
                // create and send token
                jwtServices_1.default.sendJwtResponse(user, res);
            }
            else {
                throw new appErrorServices_1.default(process.env.NODE_ENV === 'production'
                    ? 'Something is wrong with your credentials'
                    : 'Wrong password', 400);
            }
        }
        else {
            throw new appErrorServices_1.default(process.env.NODE_ENV === 'production'
                ? 'Something is wrong with your credentials'
                : 'Email does not exist', 400);
        }
    }
    catch (err) {
        return next(err);
    }
};
const protect = async (req, res, next) => {
    // 1. Getting the token and check if it's there
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new appErrorServices_1.default('You are not logged in! Please log iin to get access.', 401));
    }
    // 2. Verification token
    // 3. Check if user still exists
    // 4. Check if user changed password after the token was issued
    next();
};
exports.default = { register, login };
