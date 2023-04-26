'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Authors', [
      {
        authorName: 'Paulo Coelho',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        authorName: 'William Shakespeare',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        authorName: 'Charles Dickens ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        authorName: 'Fyodor Dostoevsky',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Authors', null, {});
  }
};
