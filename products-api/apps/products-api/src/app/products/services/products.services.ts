/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from '@products-api/database';
import { Op } from 'sequelize';
import { CreateProductDto } from '../dtos';

@Injectable()
export class ProductsServices {
  constructor(
    @InjectModel(Products)
    private productsModel: typeof Products
  ) {}

  async getAll(
    product_name: string,
    category_id: string,
    subcategory_id: string,
    current_page = 1,
    order_by = 'ASC',
    user_id: string
  ) {
    if (current_page < 1)
      throw new BadRequestException('current_page cannot be less than 1');

    const total_products = 15;
    let params = undefined;
    let total_pages = undefined;

    if (product_name) {
      params = {
        where: {
          product_name: {
            [Op.like]: `%${product_name?.toLocaleLowerCase()}%`,
          },
        },
        offset: total_products * (current_page - 1),
        limit: total_products,
      };
      total_pages = await this.productsModel.count({
        where: {
          product_name: {
            [Op.like]: `%${product_name?.toLocaleLowerCase()}%`,
          },
        },
      });
    } else {
      params = {
        offset: total_products * (current_page - 1),
        limit: total_products,
      };
      total_pages = await this.productsModel.count();
    }

    if (category_id) {
      params['where']['product_category_id'] = parseInt(category_id);
    }

    if (subcategory_id) {
      params['where']['product_subcategory_id'] = parseInt(subcategory_id);
    }
    if (user_id) {
      params['where']['user_id'] = user_id;
    }

    const products = await this.productsModel.findAll({
      ...params,
      order: [['createdAt', order_by]],
    });

    return {
      total_products: products.length,
      current_page: +current_page,
      total_pages: Math.ceil(total_pages / total_products),
      products,
    };
  }

  async create(payload: CreateProductDto) {
    const {
      product_category_id,
      product_description,
      product_name,
      product_price,
      product_state_id,
      product_subcategory_id,
      user_id,
      product_currency_id,
    } = payload;

    const newproduct = await this.productsModel.create({
      product_category_id: product_category_id,
      product_description: product_description.toLocaleLowerCase() || null,
      product_price: product_price || null,
      product_name: product_name.toLocaleLowerCase(),
      product_state_id: product_state_id,
      product_subcategory_id: product_subcategory_id,
      user_id: user_id,
      product_currency_id,
    });

    return newproduct;
  }

  async getSingle(id: number) {
    const product = (await this.productsModel.findOne({
      where: {
        id: id,
      },
    })) as any;

    if (product == null) throw new NotFoundException('Product not found');

    return product;
  }

  async editProduct({ id, user_id, productPayload }) {
    let product = await this.productsModel.findOne({
      where: {
        id: id,
      },
    });

    if (product == null) throw new NotFoundException('Product not found');
    if (product.user_id != user_id)
      throw new ForbiddenException(
        'The current user its not the owner of the product'
      );

    await this.productsModel.update(
      {
        product_name: productPayload.product_name.toLocaleLowerCase(),
        product_description:
          productPayload.product_description.toLocaleLowerCase(),
        product_price: productPayload.product_price,
        product_category_id: productPayload.product_category_id,
        product_subcategory_id: productPayload.product_subcategory_id,
        product_state_id: productPayload.product_state_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    product = await this.productsModel.findOne({
      where: {
        id: id,
      },
    });

    return product;
  }

  async deleteProduct(id: number, user_id: string, isAdmin: boolean) {
    let product = await this.productsModel.findOne({
      where: {
        id: id,
      },
    });

    if (product == null) throw new NotFoundException('Product not found');
    if (product.user_id != user_id && !isAdmin) {
      throw new ForbiddenException(
        'The current user its not the owner of the product'
      );
    }

    await this.productsModel.destroy({
      where: {
        id: id,
      },
    });

    return true;
  }
}
