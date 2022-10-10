import { Sequelize } from 'sequelize';


export const sequelize = new Sequelize(
    'itson-web', 
    'postgres', 
    'itson123', {
    host: 'localhost',
    dialect: 'postgres'
  }
);