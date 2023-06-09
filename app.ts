// env variables
require('dotenv').config();

//Import dependencies
import express, { Express, Request, Response } from 'express';

//database

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server');
});

module.exports = app;
