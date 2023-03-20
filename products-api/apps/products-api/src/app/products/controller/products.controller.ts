import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CognitoGuard } from '../../cognito/guards/cognito.guard';
import { CreateProductDto, GetProductDto, GetAllProducts } from '../dtos';
import { ProductsServices } from '../services/products.services';
import { AuthenticatedRequest } from '../../definitions';
import { UploadServices } from '../../uploads/services/upload.services';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private productServices: ProductsServices,
    private uploadServices: UploadServices
  ) {}

  @Get('/')
  async getAllProducts(
    @Query()
    {
      product_name,
      category_id,
      subcategory_id,
      current_page,
      order_by,
      user_id,
    }: GetAllProducts
  ) {
    return await this.productServices.getAll(
      product_name,
      category_id,
      subcategory_id,
      current_page,
      order_by,
      user_id
    );
  }

  @Post('/')
  @UseGuards(CognitoGuard)
  async createNewProduct(
    @Req() req: AuthenticatedRequest,
    @Body() productPayload: CreateProductDto
  ) {
    const payload = {
      user_id: req.user.id,
      ...productPayload,
    };

    return await this.productServices.create(payload);
  }

  @Patch('/:id')
  @UseGuards(CognitoGuard)
  async editProduct(
    @Param() { id }: GetProductDto,
    @Req() req: AuthenticatedRequest,
    @Body() productPayload: CreateProductDto
  ) {
    return await this.productServices.editProduct({
      id,
      user_id: req.user.id,
      productPayload,
    });
  }

  @Get('/:id')
  async getSingleProduct(@Param() { id }: GetProductDto) {
    return await this.productServices.getSingle(id);
  }

  @Delete('/:id')
  @UseGuards(CognitoGuard)
  async deleteProduct(
    @Param() { id }: GetProductDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user_id = req.user.id;
    const isAdmin = req.user.isAdmin;

    await this.uploadServices.deleteImages(id, user_id, isAdmin);

    return await this.productServices.deleteProduct(id, user_id, isAdmin);
  }
}
