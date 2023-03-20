import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from '@products-api/database';
import { CognitoServices } from '../cognito/services/cognito.services';
import { UploadControllers } from './controller/uploads.controllers';
import { UploadServices } from './services/upload.services';

@Module({
  imports: [ConfigModule.forRoot(), SequelizeModule.forFeature([Products])],
  providers: [UploadServices, CognitoServices],
  controllers: [UploadControllers],
})
export class UploadModule {}
