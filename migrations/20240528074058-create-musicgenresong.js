'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('musicgenresong', {
            musicgenreid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'musicgenre',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            songid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'song',
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
        await queryInterface.dropTable('musicgenresong');
    }
};