import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { City, State } from '@users-api/database';
import { LocationControllers } from './controllers/location.controllers';
import { LocationServices } from './services/location.services';

@Module({
  imports: [SequelizeModule.forFeature([City, State])],
  controllers: [LocationControllers],
  providers: [LocationServices],
})
export class LocationModule {}
