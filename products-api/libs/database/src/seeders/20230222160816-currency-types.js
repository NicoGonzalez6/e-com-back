'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('currency_types', [
      {
        currency: 'ARS',
      },
      {
        currency: 'USD',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
