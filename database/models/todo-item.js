const { Sequelize, DataTypes, Model } = require('sequelize');

class TodoItem extends Model {
    // define table columns here
    static attr = {
        activity_group_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        priority: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
    }

    static enumPriority = ['very-high', 'high', 'normal', 'low', 'very-low'];

    /**
     * init model
     * @param {Sequelize} sequelizeInstace sequelize instance.
     */
    static init(sequelizeInstace) {
        return super.init(this.attr, {
            // Other model options go here
            sequelize: sequelizeInstace, // We need to pass the connection instance
            tableName: 'todos',
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
        this.belongsTo(models.ActivityGroup, {
            foreignKey: 'activity_group_id',
            as: 'activityGroup',
        });
    }
}

module.exports = TodoItem;
