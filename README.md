# Test-Skyshi

A simple TODO List API using Express.js, MySQL, Sequelize ORM  

Sucsessfully tested with Node.js v16.13.1

## Install Server  
- copy file `env.example` to `.env`  
- fill your configuration in file `.env`  
- run `npm install`  
- run `npm run migrate` to import database schema  

## Running Server  
- Start your MySQL server
- then run `npm start`  

## Using Docker (Tested on Linux)  
- Start your MySQL server
- run on localhost:3030
`docker run -d --network="host" -e MYSQL_HOST=localhost -e MYSQL_PORT=<port> -e MYSQL_USER=<user> -e MYSQL_PASSWORD=<password> -e MYSQL_DBNAME=<dbname> harisol/skyshi`
- or on custom port:  
`docker run -d -p <your_port>:3030 -e MYSQL_HOST=172.17.0.1 -e MYSQL_PORT=<port> -e MYSQL_USER=<user> -e MYSQL_PASSWORD=<password> -e MYSQL_DBNAME=<dbname> harisol/skyshi`