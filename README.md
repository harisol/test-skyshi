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
- run on `localhost:3030` with this:\
`docker run -d \`\
`--network="host" \`\
`-e MYSQL_HOST=localhost \`\
`-e MYSQL_PORT=<port> \`\
`-e MYSQL_USER=<user> \`\
`-e MYSQL_PASSWORD=<password> \`\
`-e MYSQL_DBNAME=<dbname> \`\
`harisol/skyshi`
- or, run on `localhost:<custom_port>`  with this:\
`docker run -d \`\
`-p <custom_port>:3030 \`\
`--add-host=host.docker.internal:host-gateway \`\
`-e MYSQL_HOST=host.docker.internal \`\
`-e MYSQL_PORT=<port> \`\
`-e MYSQL_USER=<user> \`\
`-e MYSQL_PASSWORD=<password> \`\
`-e MYSQL_DBNAME=<dbname> \`\
`harisol/skyshi`
