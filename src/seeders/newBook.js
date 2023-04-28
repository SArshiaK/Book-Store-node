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
      {
        title: 'Pride and Prejudice',
        description: 'Pride and Prejudice is an 1813 novel of manners by Jane Austen. The novel follows the character development of Elizabeth Bennet, the protagonist of the book, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
        price: 130000,
        stock: 40,
        publishDAte: '1988-01-01',
        authorId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Don Quixote',
        description: 'Don Quixote is a Spanish epic novel by Miguel de Cervantes. Originally published in two parts, in 1605 and 1615, its full title is The Ingenious Gentleman Don Quixote of La Mancha or, in Spanish, El ingenioso hidalgo don Quixote de la Mancha',
        price: 170000,
        stock: 35,
        publishDAte: '1988-01-01',
        authorId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Lord of the Rings',
        description: 'The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien. Set in Middle-earth, the story began as a sequel to Tolkien s 1937 children s book The Hobbit, but eventually developed into a much larger wor',
        price: 190000,
        stock: 43,
        publishDAte: '1988-01-01',
        authorId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
