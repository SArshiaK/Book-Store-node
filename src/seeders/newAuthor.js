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
      {
        authorName: 'J. K. Rowling',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        authorName: 'Agatha Christie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        authorName: 'George Orwell',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        authorName: 'Mark Twain',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        authorName: 'Margaret Atwood',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        authorName: 'Albert Camus',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Authors', null, {});
  }
};
