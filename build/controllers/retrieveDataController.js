"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services
const retrieveDataServices_1 = __importDefault(require("../services/retrieveDataServices"));
const getAllUsers = async (req, res, next) => {
    try {
        const users = await retrieveDataServices_1.default.getAllUsers();
        res.status(200).json(users);
    }
    catch (err) {
        return next(err);
    }
};
const getRequestedPosts = async (req, res, next) => {
    try {
        const requestedPosts = await retrieveDataServices_1.default.getRequestedPosts();
        res.status(200).json(requestedPosts);
    }
    catch (err) {
        return next(err);
    }
};
exports.default = { getAllUsers, getRequestedPosts };
