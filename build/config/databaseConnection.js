"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : undefined;
const client = new pg_1.Client({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
    //   ssl: true,
    ssl: false,
});
exports.default = client;
