// env variables
require('dotenv').config();

//Import dependencies
import express, { Express, Request, Response } from 'express';
const cors = require('express');
const cookieParser = require('cookie-parser');

// Routes
const testRoute = require('./routes/testRoute');
const authRoute = require('./routes/authRoute');

const app: Express = express();

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', testRoute);
app.use('/api', authRoute);

module.exports = app;
