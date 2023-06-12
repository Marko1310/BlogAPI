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
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Routes
const testRoute_1 = __importDefault(require("./routes/testRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const notFoundRoute_1 = __importDefault(require("./routes/notFoundRoute"));
// Controllers
const errorController_1 = __importDefault(require("./controllers/errorController"));
const app = (0, express_1.default)();
// Setup middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api', testRoute_1.default);
app.use('/api', authRoute_1.default);
app.use('*', notFoundRoute_1.default);
app.use(errorController_1.default);
exports.default = app;
