import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './controllers/auth.controllers';
import { AuthServices } from './services/auth.service';
import { models } from '@users-api/database';
import { CognitoServices } from '../cognito/services/cognito.services';

@Module({
  imports: [SequelizeModule.forFeature([models.Users])],
  controllers: [AuthController],
  providers: [AuthServices, CognitoServices],
})
export class AuthModule {}
