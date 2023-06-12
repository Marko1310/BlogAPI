"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const checkPassword = async function (password, user) {
    return await bcryptjs_1.default.compare(password, user.password);
};
exports.default = { checkPassword };
