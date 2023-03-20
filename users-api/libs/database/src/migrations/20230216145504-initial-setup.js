'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('city', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        city_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      })
      .then(() => queryInterface.addIndex('city', ['id', 'city_name']));

    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: Sequelize.DataTypes.ENUM('admin', 'user'),
        allowNull: false,
      },
    });

    await queryInterface
      .createTable('state', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        city_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'city',
            key: 'id',
          },
        },
        state_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      })
      .then(() => queryInterface.addIndex('state', ['city_id', 'state_name']));

    await queryInterface
      .createTable('users', {
        id: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone_number: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        street_addres: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        street_number: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        city_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'city',
            key: 'id',
          },
        },
        state_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'state',
            key: 'id',
          },
        },
        user_role_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
        },
        user_status: {
          type: Sequelize.DataTypes.ENUM('enabled', 'disabled'),
          allowNull: false,
          defaultValue: 'enabled',
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
      .then(() => queryInterface.addIndex('users', ['id', 'name']));
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('users');
    queryInterface.dropTable('city');
    queryInterface.dropTable('state');
  },
};
