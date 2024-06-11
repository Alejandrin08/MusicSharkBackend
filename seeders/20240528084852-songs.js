'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('song', [
          { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '00:05:55', createdAt: new Date(), updatedAt: new Date() },
          { id: 2, title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: '00:03:03', createdAt: new Date(), updatedAt: new Date() },
          { id: 3, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: '00:06:30', createdAt: new Date(), updatedAt: new Date() },
          { id: 4, title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: '00:08:02', createdAt: new Date(), updatedAt: new Date() },
          { id: 5, title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: '00:04:54', createdAt: new Date(), updatedAt: new Date() },
          { id: 6, title: 'Hey Jude', artist: 'The Beatles', album: 'Hey Jude', duration: '00:07:11', createdAt: new Date(), updatedAt: new Date() },
          { id: 7, title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: '00:05:01', createdAt: new Date(), updatedAt: new Date() },
          { id: 8, title: 'Like a Rolling Stone', artist: 'Bob Dylan', album: 'Highway 61 Revisited', duration: '00:06:13', createdAt: new Date(), updatedAt: new Date() },
          { id: 9, title: 'I Will Always Love You', artist: 'Whitney Houston', album: 'The Bodyguard', duration: '00:04:31', createdAt: new Date(), updatedAt: new Date() },
          { id: 10, title: 'Sweet Child o\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', duration: '00:05:56', createdAt: new Date(), updatedAt: new Date() }
      ]);
  },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('song', null, {});
    }
};