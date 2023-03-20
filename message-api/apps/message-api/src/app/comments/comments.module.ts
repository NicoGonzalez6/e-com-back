import { Comments } from '@message-api/database';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SequelizeModule } from '@nestjs/sequelize';
import { CognitoServices } from '../cognito/services/cognito.services';
import { CommentsController } from './controllers/comments.controller';
import { CommentsServices } from './services/comments.services';

@Module({
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([Comments])],
  providers: [CommentsServices, ConfigService, CognitoServices],
})
export class CommentsModule {}
