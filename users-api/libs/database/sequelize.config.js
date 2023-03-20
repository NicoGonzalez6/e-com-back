const { config } = require('dotenv');
const path = require('path');
config({
  path: path.resolve('../../.env'),
});

const dbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
};

const development = {
  ...dbConfig,
  port: process.env.DB_PORT,
};

module.exports = { development };
