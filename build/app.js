"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// env variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Import dependencies
const express_1 = __importDefault(require("express"));
const express_2 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Routes
const testRoute_1 = __importDefault(require("./routes/testRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const app = (0, express_1.default)();
// Setup middleware
app.use((0, express_2.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api', testRoute_1.default);
app.use('/api', authRoute_1.default);
exports.default = app;
