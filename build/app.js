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
// Routes
const testRoute_1 = __importDefault(require("./routes/testRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const blogRoute_1 = __importDefault(require("./routes/blogRoute"));
const dataRoute_1 = __importDefault(require("./routes/dataRoute"));
const notFoundRoute_1 = __importDefault(require("./routes/notFoundRoute"));
// Controllers
const errorController_1 = __importDefault(require("./controllers/errorController"));
const app = (0, express_1.default)();
// Setup middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api', testRoute_1.default);
app.use('/api', authRoute_1.default);
app.use('/api/', blogRoute_1.default);
app.use('/api/', dataRoute_1.default);
app.use('*', notFoundRoute_1.default);
// Global error handler
app.use(errorController_1.default);
exports.default = app;
