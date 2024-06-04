'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      passwordhash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      protected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      roleid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'role',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('user');
  }
};