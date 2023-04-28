'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bgconnectors', [
      {
        BookId:1,
        groupId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BookId:1,
        groupId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BookId:1,
        groupId:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BookId:2,
        groupId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BookId:3,
        groupId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BookId:4,
        groupId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BookId:4,
        groupId:6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BookId:8,
        groupId:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BookId:8,
        groupId:8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BookId:7,
        groupId:4,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        BookId:7,
        groupId:5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        BookId:7,
        groupId:6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bgconnector', null, {});
  }
};
