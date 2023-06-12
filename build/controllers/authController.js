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
var MaxAge;
(function (MaxAge) {
    MaxAge[MaxAge["OneDay"] = 86400] = "OneDay";
    MaxAge[MaxAge["OneWeek"] = 604800] = "OneWeek";
    MaxAge[MaxAge["OneDayMiliSec"] = 86400000] = "OneDayMiliSec";
    MaxAge[MaxAge["OneWeekMiliSec"] = 604800000] = "OneWeekMiliSec";
})(MaxAge || (MaxAge = {}));
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
        const token = jwtServices_1.default.createToken(user.userId, MaxAge.OneWeek);
        res.cookie('jwt', token, { httpOnly: true, maxAge: MaxAge.OneWeekMiliSec });
        res.status(200).json({ userId: user.userId });
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
        res.json({ email, password });
    }
    catch (err) {
        return next(err);
    }
};
exports.default = { register, login };
