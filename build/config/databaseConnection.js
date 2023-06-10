"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : undefined;
const sequelize = new sequelize_1.Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: 'postgres',
});
exports.default = sequelize;
