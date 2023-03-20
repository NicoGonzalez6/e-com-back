'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        category_name: 'Telefonía',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
