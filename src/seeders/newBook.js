'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [
      {
        title: 'The Alchemist',
        description: 'An allegorical novel, The Alchemist follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a',
        price: 80000,
        stock: 40,
        publishDAte: '1988-01-01',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The',
        description: 'ter having a recurring dream of finding a',
        price: 183000,
        stock: 10,
        publishDAte: '1988-01-01',
        authorId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Alcht',
        description: 'An allegorical novel, The Alchemist er having a recurring dream of finding a',
        price: 120000,
        stock: 20,
        publishDAte: '1988-01-01',
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Alc',
        description: 'An aThe Alchemist er having a recurring dream of finding a',
        price: 80000,
        stock: 30,
        publishDAte: '1988-01-01',
        authorId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'mist',
        description: 'an shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a',
        price: 90000,
        stock: 20,
        publishDAte: '1988-01-01',
        authorId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
