import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { Param, Patch } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../cognito/guards/admin.guard';
import { CognitoGuard } from '../../cognito/guards/cognito.guard';
import { CreateSubcategoryDto, EditSubCategoryDto } from '../dtos';

import { SubCategoriesServices } from '../services/subcategories.services';

@ApiTags('SubCategories')
@Controller('subcategory')
export class SubCategoryController {
  constructor(private subcategoriesServices: SubCategoriesServices) {}

  @Get('')
  async getAllSubCategories() {
    return await this.subcategoriesServices.getAll();
  }

  @Patch('/:id')
  @UseGuards(CognitoGuard, AdminGuard)
  async editSubCategory(
    @Param() { id }: EditSubCategoryDto,
    @Body() { parent_category_id, subcategory_name }: EditSubCategoryDto
  ) {
    return await this.subcategoriesServices.edit(
      id,
      parent_category_id,
      subcategory_name
    );
  }

  @Post('/')
  @UseGuards(CognitoGuard, AdminGuard)
  async createSubCategory(
    @Body() { parent_category_id, subcategory_name }: CreateSubcategoryDto
  ) {
    return await this.subcategoriesServices.create(
      parent_category_id,
      subcategory_name
    );
  }
}
