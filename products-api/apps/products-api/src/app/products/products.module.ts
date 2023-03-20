import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from '@products-api/database';
import { CognitoServices } from '../cognito/services/cognito.services';
import { UploadServices } from '../uploads/services/upload.services';
import { ProductsController } from './controller/products.controller';
import { ProductsServices } from './services/products.services';

@Module({
  controllers: [ProductsController],
  imports: [SequelizeModule.forFeature([Products])],
  exports: [],
  providers: [ProductsServices, CognitoServices, UploadServices],
})
export class ProductsModule {}
