import { Sequelize } from 'sequelize';

const user: string = process.env.DB_USER as string;
const host: string = process.env.DB_HOST as string;
const database: string = process.env.DB_DATABASE as string;
const password: string = process.env.DB_PASSWORD as string;
const port: number | undefined = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;

const sequelize: Sequelize = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: 'postgres',
});

export default sequelize;
