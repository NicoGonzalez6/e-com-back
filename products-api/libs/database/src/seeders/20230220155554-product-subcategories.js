'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('subcategories', [
      {
        parent_category_id: 1,
        subcategory_name: 'Celulares',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
