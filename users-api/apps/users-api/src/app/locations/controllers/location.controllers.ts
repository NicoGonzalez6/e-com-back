import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetStatesDto } from '../dtos';
import { LocationServices } from '../services/location.services';

@ApiTags('Locations endpoints')
@Controller('locations')
export class LocationControllers {
  constructor(private locationServices: LocationServices) {}

  @Get('/cities')
  async getCities(): Promise<any> {
    return this.locationServices.getCities();
  }

  @Get('/states')
  async getStates(@Query() { city_id }: GetStatesDto): Promise<any> {
    return this.locationServices.getStates(city_id);
  }
}
