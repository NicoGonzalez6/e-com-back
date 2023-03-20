import { Controller, Get, Param } from '@nestjs/common';
import { Body, Patch, Post, UseGuards } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesServices } from '../services/categories.services';
import { EditCategoryDto, CreateCategoryDto } from '../dtos';
import { CognitoGuard } from '../../cognito/guards/cognito.guard';
import { AdminGuard } from '../../cognito/guards/admin.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesServices: CategoriesServices) {}

  @Get('/')
  async getAllCategories() {
    return this.categoriesServices.getAll();
  }

  @Post('/')
  @UseGuards(CognitoGuard, AdminGuard)
  async createCategory(@Body() { category_name }: CreateCategoryDto) {
    return this.categoriesServices.create(category_name);
  }

  @Patch('/:id')
  @UseGuards(CognitoGuard, AdminGuard)
  async deleteCategory(
    @Param() { id }: EditCategoryDto,
    @Body() { category_name }: EditCategoryDto
  ) {
    return this.categoriesServices.edit(id, category_name);
  }
}
