'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logbook', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idelement: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logbook');
  }
};