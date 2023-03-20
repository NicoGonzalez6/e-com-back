import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductState } from '@products-api/database';
import { ProductStateController } from './controller/product-state.controller';
import { ProductStateServices } from './services/product-state.services';

@Module({
  imports: [SequelizeModule.forFeature([ProductState])],
  providers: [ProductStateServices],
  controllers: [ProductStateController],
})
export class ProductStatesModule {}
