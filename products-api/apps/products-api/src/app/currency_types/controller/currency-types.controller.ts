import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrencyTypesServices } from '../services/currency_types.services';

@Controller('currency-types')
@ApiTags('Currency types')
export class CurrencyTypesController {
  constructor(private currencyTypesServices: CurrencyTypesServices) {}

  @Get('/')
  async getAllTypes() {
    return await this.currencyTypesServices.getAllCurrencyTypes();
  }
}
