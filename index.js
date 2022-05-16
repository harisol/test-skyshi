require('dotenv').config();

/**
 * about NODE_ENV value:
 * - check if set in this file
 * - if not found, check in cross-env usage at package.json scripts
 * - if not found, check in .env file
 * 
 * default value of NODE_ENV is undefined.
 * default value of server.get('env') is "development".
 * if you set NODE_ENV value before init the server (calling "express()"),
 * server.get('env') will be equal to NODE_ENV.
 */
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV='development';
}

const { sequelizeInstance } = require('./database/models');
const server = require('./server');

let host = '0.0.0.0',
    port = 3030;

const API_URL = process.env.API_URL;
if (API_URL && API_URL.includes(':')) {
    const split = API_URL.split(':');
    host = split[0];
    port = split[1];
}

server.listen(port, host, () => {
    console.log(`Server is live at ${host}:${port} using environment "${server.get('env')}"`)
});
