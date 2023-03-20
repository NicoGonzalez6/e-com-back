import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CognitoServices } from './services/cognito.services';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [CognitoServices],
})
export class CognitoModule {}
