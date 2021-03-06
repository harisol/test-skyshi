require('dotenv').config();
const { Sequelize } = require("sequelize");
const envConfigs =  require('../config/config');
const ActivityGroup = require('./activity-group');
const TodoItem = require('./todo-item');

// append models here
const models = {
    ActivityGroup,
    TodoItem
};

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

const sequelize = config.uri
    ? new Sequelize(config.uri, {})
    : new Sequelize(config);

// init each models
Object.values(models)
    .forEach(model => model.init(sequelize));

// run `.associate` if it exists,
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

if (env === 'test') {
    console.log(`sequelize config is using environment ${env}`);
} else {
    console.log('model has been initialized');
}

/* get all available tables */
// sequelizeInstance.getQueryInterface().showAllSchemas().then((tableObj) => {
//     tableObj.forEach(v => {
//         for (const key in v) {
//             console.log('table ', v[key]);
//         }
//     })
// });

module.exports = {
    ...models,
    sequelizeInstance: sequelize
}
