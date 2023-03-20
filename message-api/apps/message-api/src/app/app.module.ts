import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comments } from '@message-api/database';
import { CommentsModule } from './comments/comments.module';
import { CognitoModule } from './cognito/cognito.module';

const models = [Comments];

@Module({
  imports: [
    CommentsModule,
    CognitoModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: false,
        autoLoadModels: true,
        models: models,
        dialect: 'postgres',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
