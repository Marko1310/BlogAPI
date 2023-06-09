"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// env variables
require('dotenv').config();
//Import dependencies
const express_1 = __importDefault(require("express"));
//database
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello from the server');
});
module.exports = app;
