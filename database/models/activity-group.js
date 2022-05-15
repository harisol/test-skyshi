const { Sequelize, DataTypes, Model } = require('sequelize');

class ActivityGroup extends Model {
    // define table columns here
    static attr = {
        email: DataTypes.STRING,
        title: DataTypes.STRING,
    }

    /**
     * init model
     * @param {Sequelize} sequelizeInstace sequelize instance.
     */
    static init(sequelizeInstace) {
        return super.init(this.attr, {
            // Other model options go here
            sequelize: sequelizeInstace, // We need to pass the connection instance
            tableName: 'activity-groups',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            // updatedAt: false,
            underscore: true,
        });
    }
    
    /**
     * define associations here
     * @param {Object} models initialized models in models/index.js.
     */
    static associate(models) {
        this.hasMany(models.TodoItem, {
            foreignKey: 'activity_group_id',
            as: 'todo_items',
        });
    }

    // define queries here
    static listAndCountByEmail(email) {
        return this.findAndCountAll({
            where: { email }
        });
    }
}

module.exports = ActivityGroup;
