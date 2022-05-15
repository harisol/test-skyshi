require('dotenv').config();

module.exports = {
  development: {
    uri: process.env.MYSQL_HOST_FULL_URI, // A full database URI
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    port: process.env.MYSQL_PORT,
    logging: false,
    dialect: 'mysql',
  },
  production: {
    uri: process.env.PROD_DATABASE_URI, // A full database URI
    host: process.env.PROD_DATABASE_HOST,
    username: process.env.PROD_DATABASE_USERNAME,
    password: process.env.PROD_DATABASE_PASSWORD,
    database: process.env.PROD_DATABASE_NAME,
    logging: false,
    dialect: 'postgres',
  },
  test: {
    host: process.env.TEST_DATABASE_HOST,
    username: process.env.TEST_DATABASE_USERNAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    logging: false,
    dialect: 'postgres',
  },
};