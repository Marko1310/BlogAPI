"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_1 = require("sequelize");
const user = process.env.DBB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;
const sequelize = new sequelize_1.Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: 'postgres',
});
// Sync object
const config = {
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
exports.default = config;
