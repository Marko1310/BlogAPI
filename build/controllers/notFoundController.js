"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Error Middleware
const appError_1 = __importDefault(require("../utils/appError"));
const notFound = async (req, res, next) => {
    try {
        const err = new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404);
        next(err);
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = {
    notFound,
};
