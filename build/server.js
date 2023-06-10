"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const app_1 = __importDefault(require("./app"));
// Setup server
const PORT = process.env.PORT || 8000;
//Import database
const databaseConnection_1 = __importDefault(require("./config/databaseConnection"));
// 1) Connect the database
// 2) Start server
async function connect() {
    try {
        await databaseConnection_1.default.authenticate();
        console.log('Connection has been established successfully.');
        app_1.default.listen(PORT, () => {
            console.log(`now listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect();
