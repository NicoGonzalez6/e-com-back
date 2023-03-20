import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Categories,
  ProductState,
  Products,
  SubCategories,
  CurrencyTypes,
} from '@products-api/database';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { CognitoModule } from './cognito/cognito.module';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './uploads/uploads.module';
import { ProductStatesModule } from './products_state/product_state.module';
import { CurrencyTypesModule } from './currency_types/currency_types.module';

const models = [
  Categories,
  ProductState,
  Products,
  SubCategories,
  CurrencyTypes,
];

@Module({
  imports: [
    UploadModule,
    CategoriesModule,
    CognitoModule,
    CategoriesModule,
    CurrencyTypesModule,
    SubcategoriesModule,
    ProductStatesModule,
    ProductsModule,
    CognitoModule,
    ConfigModule.forRoot({ isGlobal: true }),
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
        dialect: 'postgres',
        autoLoadModels: true,
        models: [...models],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
