import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER ?? 'app_user',
  password: process.env.DB_PASSWORD ?? 'app_password',
  database: process.env.DB_NAME ?? 'hc_dev',
  entities: [],
  migrations: ['./migrations/*.ts'],
  synchronize: false,
});
