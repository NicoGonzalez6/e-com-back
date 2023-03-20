import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubCategories, Categories } from '@products-api/database';
import { CognitoServices } from '../cognito/services/cognito.services';
import { SubCategoryController } from './controller/subcategories.controller';
import { SubCategoriesServices } from './services/subcategories.services';

@Module({
  controllers: [SubCategoryController],
  imports: [SequelizeModule.forFeature([SubCategories, Categories])],
  providers: [SubCategoriesServices, CognitoServices],
})
export class SubcategoriesModule {}
