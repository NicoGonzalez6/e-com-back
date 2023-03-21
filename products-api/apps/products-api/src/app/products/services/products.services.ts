/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from '@products-api/database';
import { Op } from 'sequelize';
import { CreateProductDto } from '../dtos';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsServices {
  constructor(
    @InjectModel(Products)
    private productsModel: typeof Products,
    private configService: ConfigService
  ) {}

  async getAll(
    product_name: string,
    category_id: string,
    subcategory_id: string,
    current_page: string,
    order_by = 'ASC',
    user_id: string
  ) {
    let params = undefined;

    if (product_name) {
      params = {
        where: {
          product_name: {
            [Op.like]: `%${product_name?.toLocaleLowerCase()}%`,
          },
        },
        offset: 20 * +current_page,
        limit: 20,
      };
    } else {
      params = {
        offset: 20 * +current_page,
        limit: 20,
      };
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
