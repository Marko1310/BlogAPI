// env variables
require('dotenv').config();

//Import dependencies
import express, { Express, Request, Response } from 'express';
const cors = require('express');
const cookieParser = require('cookie-parser');

// Routes
const testRoute = require('./routes/testRoute');

const app: Express = express();

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', testRoute);

module.exports = app;
