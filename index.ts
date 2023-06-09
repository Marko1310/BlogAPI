require('dotenv').config();

import express, { Express, Request, Response } from 'express';
import client from './config/databaseConnection';

const port = 8000;

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server');
});

app.get('/hi', (req: Request, res: Response) => {
  res.send('Hi!!');
});

async function connect(): Promise<void> {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    app.listen(port, () => {
      console.log(`now listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
}

connect();
