import { Module } from '@nestjs/common';
import { CategoriesController } from './controller/categories.controller';
import { CategoriesServices } from './services/categories.services';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories, SubCategories } from '@products-api/database';
import { CognitoServices } from '../cognito/services/cognito.services';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesServices, CognitoServices],
  imports: [SequelizeModule.forFeature([Categories, SubCategories])],
})
export class CategoriesModule {}
