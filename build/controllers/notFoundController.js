"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Error Middleware
const appErrorServices_1 = __importDefault(require("../services/appErrorServices"));
const notFound = async (req, res, next) => {
    try {
        const err = new appErrorServices_1.default(`Can't find ${req.originalUrl} on this server!`, 404);
        next(err);
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = {
    notFound,
};
