"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Controllers
const inputController_1 = __importDefault(require("./inputController"));
// services
const userServices_1 = __importDefault(require("../services/userServices"));
const jwtServices_1 = __importDefault(require("../services/jwtServices"));
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
const bcryptServices_1 = __importDefault(require("../services/bcryptServices"));
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
    try {
        // 1. Getting the token and check if it's there
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new appErrorServices_1.default('You are not logged in! Please log in to get access.', 401);
        }
        // 2. Verification token
        const decodedToken = jwtServices_1.default.verifyJwtToken(token);
        console.log(decodedToken);
        // 3. Check if user still exists
        // 4. Check if user changed password after the token was issued
    }
    catch (err) {
        next(err);
    }
};
exports.default = { register, login, protect };
