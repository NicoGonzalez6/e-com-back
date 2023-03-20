import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductStateServices } from '../services/product-state.services';

@Controller('product-state')
@ApiTags('Product states')
export class ProductStateController {
  constructor(private productStateServices: ProductStateServices) {}
  @Get('/')
  async getProductStates() {
    return await this.productStateServices.getAllProductsStates();
  }
}
