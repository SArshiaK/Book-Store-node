'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bgconnector', [
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
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bgconnector', null, {});
  }
};
