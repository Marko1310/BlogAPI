// env variables
import dotenv from 'dotenv';
dotenv.config();

//Import dependencies
import express, { Express } from 'express';
import cors from 'express';
import cookieParser from 'cookie-parser';

// Routes
import testRoute from './routes/testRoute';
import authRoute from './routes/authRoute';
import notFoundRoute from './routes/notFoundRoute';

const app: Express = express();

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// Routes
app.use('/api', testRoute);
app.use('/api', authRoute);
app.all('*', notFoundRoute);

export default app;
