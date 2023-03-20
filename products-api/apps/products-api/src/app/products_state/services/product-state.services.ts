import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductState } from '@products-api/database';
@Injectable()
export class ProductStateServices {
  constructor(
    @InjectModel(ProductState)
    private productStateModel: typeof ProductState
  ) {}

  async getAllProductsStates() {
    const allProductStates = await this.productStateModel.findAll();

    return allProductStates;
  }
}
