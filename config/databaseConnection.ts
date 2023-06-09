import { Client } from 'pg';

const user: string = process.env.DB_USER as string;
const host: string = process.env.DB_HOST as string;
const database: string = process.env.DATABASE as string;
const password: string = process.env.DB_PASSWORD as string;
const port: number | undefined = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT, 10)
  : undefined;

const client: Client = new Client({
  host: host,
  port: port,
  user: user,
  password: password,
  database: database,
  //   ssl: true,
  ssl: false,
});

export default client;
