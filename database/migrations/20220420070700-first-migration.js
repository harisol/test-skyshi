'use strict';

const Sequelize = require('sequelize');

module.exports = {
  /**
   * @param {Sequelize.QueryInterface} queryInterface singleton instance of QueryInterface class.
   * @param {Sequelize} Sequelize sequelize module.
   */
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      const createActivityGroups = queryInterface.createTable(
        'activities',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING(255),
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING(255),
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        { transaction: t }
      );

      const createTodoItems = queryInterface.createTable(
        'todos',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          activity_group_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING(255),
          },
          priority: {
            allowNull: false,
            type: Sequelize.STRING(50),
            defaultValue: 'very-high'
          },
          is_active: {
            allowNull: false,
            type: Sequelize.TINYINT,
            defaultValue: 1
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        { transaction: t }
      );

      
      return Promise.all([
        createActivityGroups,
        createTodoItems,
      ]);
    });
  },

  /**
   * @param {Sequelize.QueryInterface} queryInterface singleton instance of QueryInterface class.
   * @param {Sequelize} Sequelize sequelize module.
   */
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('activities', { transaction: t }),
        queryInterface.dropTable('todos', { transaction: t }),
      ]);
    });
  },
};
