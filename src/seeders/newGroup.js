'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      {
        groupName: 'Crime',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Horror',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Classics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Fantasy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Non-fiction',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Fiction',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Biography',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupName: 'Mystery',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
