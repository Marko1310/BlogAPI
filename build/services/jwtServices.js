"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dependencies
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
var MaxAge;
(function (MaxAge) {
    MaxAge[MaxAge["OneDay"] = 86400] = "OneDay";
    MaxAge[MaxAge["OneWeek"] = 604800] = "OneWeek";
    MaxAge[MaxAge["OneDayMiliSec"] = 86400000] = "OneDayMiliSec";
    MaxAge[MaxAge["OneWeekMiliSec"] = 604800000] = "OneWeekMiliSec";
})(MaxAge || (MaxAge = {}));
const sendJwtResponse = (user, res) => {
    const token = jsonwebtoken_1.default.sign({ userId: user.userId }, jwtSecret, {
        expiresIn: MaxAge.OneWeek,
    });
    res.cookie('jwt', token, { httpOnly: true, maxAge: MaxAge.OneWeekMiliSec });
    res.status(200).json({ userId: user.userId, token: token });
};
const verifyJwtToken = (token) => {
    return jsonwebtoken_1.default.verify(token, jwtSecret);
};
exports.default = { sendJwtResponse, verifyJwtToken };
