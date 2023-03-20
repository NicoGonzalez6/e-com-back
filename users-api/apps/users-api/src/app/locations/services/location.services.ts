import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City, State } from '@users-api/database';

@Injectable()
export class LocationServices {
  constructor(
    @InjectModel(City)
    private cityModel: typeof City,
    @InjectModel(State)
    private stateModel: typeof State
  ) {}
  async getCities() {
    return this.cityModel.findAll();
  }

  async getStates(city_id: number) {
    return this.stateModel.findAll({
      where: {
        city_id: city_id,
      },
    });
  }
}
