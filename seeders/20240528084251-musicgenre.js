'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('musicgenre', [
          { id: 1, name: 'Rock', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 2, name: 'Pop', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 3, name: 'Jazz', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 4, name: 'Classical', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 5, name: 'Hip Hop', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 6, name: 'Country', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 7, name: 'Reggae', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 8, name: 'Blues', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 9, name: 'Electronic', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 10, name: 'Latin', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 11, name: 'Metal', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 12, name: 'Folk', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 13, name: 'R&B', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 14, name: 'Soul', protected: true, createdAt: new Date(), updatedAt: new Date() },
          { id: 15, name: 'Punk', protected: true, createdAt: new Date(), updatedAt: new Date() }
      ]);
  },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('musicgenre', null, {});
    }
};