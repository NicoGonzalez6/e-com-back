'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('city', [
      {
        city_name: 'San Juan',
      },
    ]);

    return await queryInterface.bulkInsert('state', [
      {
        city_id: 1,
        state_name: 'Capital',
      },
      {
        city_id: 1,
        state_name: 'Rivadavia',
      },
      {
        city_id: 1,
        state_name: 'Santa Lucía',
      },
      {
        city_id: 1,
        state_name: 'Rawson',
      },
      {
        city_id: 1,
        state_name: 'Zonda',
      },
      {
        city_id: 1,
        state_name: 'Ullúm',
      },
      {
        city_id: 1,
        state_name: 'Chimbas',
      },
      {
        city_id: 1,
        state_name: 'Albardón',
      },
      {
        city_id: 1,
        state_name: 'Angaco',
      },
      {
        city_id: 1,
        state_name: 'San Martín',
      },
      {
        city_id: 1,
        state_name: 'Caucete',
      },
      {
        city_id: 1,
        state_name: 'Sarmiento',
      },
      {
        city_id: 1,
        state_name: 'Calingasta',
      },
      {
        city_id: 1,
        state_name: 'Iglesia',
      },
      {
        city_id: 1,
        state_name: 'Jáchal',
      },
      {
        city_id: 1,
        state_name: 'Valle Fértil',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('city', null, {});
    return await queryInterface.bulkDelete('state', null, {});
  },
};
