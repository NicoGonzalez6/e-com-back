import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '@users-api/database';
import { CognitoServices } from '../cognito/services/cognito.services';
import { UsersControllers } from './controllers/users.controllers';
import { UserServices } from './services/users.services';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [UsersControllers],
  providers: [UserServices, CognitoServices],
})
export class UsersModule {}
