"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// env variables
require('dotenv').config();
//Import dependencies
const express_1 = __importDefault(require("express"));
const cors = require('express');
const cookieParser = require('cookie-parser');
// Routes
const testRoute = require('./routes/testRoute');
const app = (0, express_1.default)();
// Setup middleware
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', testRoute);
module.exports = app;
