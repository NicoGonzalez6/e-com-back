'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_state', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      state: {
        type: Sequelize.DataTypes.ENUM('nuevo', 'usado'),
        allowNull: false,
      },
    });

    await queryInterface
      .createTable('categories', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        category_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
      })
      .then(() => queryInterface.addIndex('categories', ['id']));

    await queryInterface.createTable('currency_types', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      currency: {
        type: Sequelize.DataTypes.ENUM('ARS', 'USD'),
        allowNull: false,
      },
    });

    await queryInterface
      .createTable('subcategories', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        parent_category_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id',
          },
        },
        subcategory_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
      })
      .then(() =>
        queryInterface.addIndex('subcategories', ['id', 'parent_category_id'])
      );

    await queryInterface
      .createTable('products', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        product_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        product_description: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        product_currency_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'currency_types',
            key: 'id',
          },
        },
        product_price: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        product_state_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'product_state',
            key: 'id',
          },
        },
        product_category_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id',
          },
        },
        product_subcategory_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'subcategories',
            key: 'id',
          },
        },
        product_images: {
          type: Sequelize.DataTypes.JSONB,
          allowNull: true,
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
      .then(() =>
        queryInterface.addIndex('products', ['id', 'user_id', 'product_name'])
      );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('subcategories', null, {});
    queryInterface.bulkDelete('categories', null, {});
    queryInterface.bulkDelete('product_state', null, {});
    queryInterface.bulkDelete('products', null, {});
  },
};
