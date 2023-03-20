import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CognitoServices } from './services/cognito.services';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [CognitoServices],
  exports: [CognitoServices],
})
export class CognitoModule {}
