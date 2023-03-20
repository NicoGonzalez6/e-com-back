'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('comments', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        product_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        responded: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        comment_state: {
          type: Sequelize.DataTypes.ENUM('enabled', 'disabled'),
          allowNull: false,
          defaultValue: 'enabled',
        },
        message: {
          type: Sequelize.DataTypes.STRING,
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
      })
      .then(() => queryInterface.addIndex('comments', ['product_id']));
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('comments', null, {});
  },
};
