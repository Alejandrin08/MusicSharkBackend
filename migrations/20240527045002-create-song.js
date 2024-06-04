'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('song', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: 'Without title'
      },
      artist: {
        type: Sequelize.STRING,
        defaultValue: 'Without artist'
      },
      album: {
        type: Sequelize.STRING,
        defaultValue: 'Without album'
      },
      duration: {
        type: Sequelize.TIME,
        defaultValue: '00:00:00'
      },
      fileid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'file',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('song');
  }
};