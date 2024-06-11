'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('musicgenresong', [
            { musicgenreid: 1, songid: 1, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 2, songid: 2, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 3, songid: 3, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 1, songid: 4, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 2, songid: 5, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 2, songid: 6, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 9, songid: 7, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 13, songid: 8, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 10, songid: 9, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 1, songid: 10, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 7, songid: 1, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 2, songid: 2, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 2, songid: 3, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 2, songid: 4, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 2, songid: 1, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 1, songid: 2, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 1, songid: 6, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 2, songid: 9, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 3, songid: 8, createdAt: new Date(), updatedAt: new Date() },
            { musicgenreid: 5, songid: 7, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('musicgenresong', null, {});
    }
};
