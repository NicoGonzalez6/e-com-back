import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CurrencyTypes } from '@products-api/database';
import { CurrencyTypesController } from './controller/currency-types.controller';
import { CurrencyTypesServices } from './services/currency_types.services';

@Module({
  imports: [SequelizeModule.forFeature([CurrencyTypes])],
  providers: [CurrencyTypesServices],
  controllers: [CurrencyTypesController],
})
export class CurrencyTypesModule {}
