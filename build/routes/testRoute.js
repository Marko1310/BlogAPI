"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
// routes
exports.router.get('/', (req, res) => {
    res.status(200).json('Hello from the server');
});
exports.default = exports.router;
