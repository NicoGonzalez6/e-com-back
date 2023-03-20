import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminsModule } from './admin/admin.module';
import { models } from '@users-api/database';
import { UsersModule } from './users/uses.module';
import { LocationModule } from './locations/locations.module';

@Module({
  imports: [
    AuthModule,
    AdminsModule,
    UsersModule,
    LocationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
        models: [models.City, models.Users, models.State, models.Roles],
        dialect: 'postgres',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
