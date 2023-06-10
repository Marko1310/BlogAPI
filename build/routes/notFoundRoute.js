"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express router
const express_1 = require("express");
const router = (0, express_1.Router)();
// controller
const notFoundController_1 = __importDefault(require("../controllers/notFoundController"));
// routes
router.all('*', notFoundController_1.default.notFound);
exports.default = router;
