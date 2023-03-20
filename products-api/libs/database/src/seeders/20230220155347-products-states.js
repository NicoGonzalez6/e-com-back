'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('product_state', [
      {
        state: 'nuevo',
      },
      {
        state: 'usado',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
