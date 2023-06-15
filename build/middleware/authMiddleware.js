"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services
const userServices_1 = __importDefault(require("../services/userServices"));
const jwtServices_1 = __importDefault(require("../services/jwtServices"));
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
const requireAuth = async (req, res, next) => {
    try {
        // 1. Getting the token and check if it's there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new appErrorServices_1.default('You are not logged in! Please log in to get access.', 401);
        }
        // 2. Verification token
        const decodedToken = jwtServices_1.default.verifyJwtToken(token);
        if (!decodedToken) {
            throw new appErrorServices_1.default('Invalid token! Please log in again to get access.', 401);
        }
        // 3. Check if user still exists
        const currentUser = await userServices_1.default.findUserbyID(decodedToken.userId);
        if (!currentUser) {
            throw new appErrorServices_1.default('The user belonging to the token no longer exist.', 401);
        }
        // Grant access
        req.user = currentUser;
        next();
    }
    catch (err) {
        next(err);
    }
};
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new appErrorServices_1.default(`You don't have permission to perform this action`, 403));
        }
        next();
    };
};
exports.default = { requireAuth, restrictTo };
