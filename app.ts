// env variables
import dotenv from 'dotenv';
dotenv.config();

//Import dependencies
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import testRoute from './routes/testRoute';
import authRoute from './routes/authRoute';
import blogRoute from './routes/blogRoute';
import dataRoute from './routes/dataRoute';
import notFoundRoute from './routes/notFoundRoute';

// Controllers
import globallErrorHandler from './controllers/errorController';

const app: Express = express();

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', testRoute);
app.use('/api', authRoute);
app.use('/api/', blogRoute);
app.use('/api/', dataRoute);
app.use('*', notFoundRoute);
app.use(globallErrorHandler);

export default app;
