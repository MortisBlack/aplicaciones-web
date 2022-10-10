import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import path  from 'path';
import { fileURLToPath } from 'url';

const direction = new URL('../../.env', import.meta.url)
dotenv.config({ path: direction });

export const connection = new Sequelize(
    process.env.POSTGRES_DB, 
    process.env.POSTGRES_USER, 
    process.env.POSTGRES_PASSWORD, {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      dialect: 'postgres',
      logging: false
    }
);