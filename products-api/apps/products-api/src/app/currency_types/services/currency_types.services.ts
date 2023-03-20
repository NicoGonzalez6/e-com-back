import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CurrencyTypes } from '@products-api/database';

@Injectable()
export class CurrencyTypesServices {
  constructor(
    @InjectModel(CurrencyTypes)
    private currencyTypesModel: typeof CurrencyTypes
  ) {}

  async getAllCurrencyTypes() {
    return await this.currencyTypesModel.findAll();
  }
}
