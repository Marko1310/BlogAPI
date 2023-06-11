"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const app_1 = __importDefault(require("./app"));
// Setup server
const PORT = process.env.PORT || 8000;
//import model config
const modelsConfig_1 = __importDefault(require("./config/modelsConfig"));
// 1) Connect the database, sync models
// 2) Start server
const startServer = async () => {
    try {
        await (0, modelsConfig_1.default)();
        console.log(`All models are in sync`);
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log('Error starting server:', error);
    }
};
startServer();
