import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '@users-api/database';
import { AuthServices } from '../auth/services/auth.service';
import { CognitoServices } from '../cognito/services/cognito.services';
import { AdminControllers } from './controllers/admin.controllers';
import { AdminServices } from './services/admin.services';

@Module({
  imports: [ConfigModule.forRoot(), SequelizeModule.forFeature([Users])],
  controllers: [AdminControllers],
  providers: [AdminServices, CognitoServices, AuthServices],
})
export class AdminsModule {}
