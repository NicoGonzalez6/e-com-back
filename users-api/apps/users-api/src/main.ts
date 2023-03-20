import { Logger, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppModule } from './app/app.module';

const globalPrefix = 'api';
const defaultPort = 3999;

async function configApp(app: INestApplication) {
  app.use(helmet());
  app.use(morgan('dev'));
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const configService = await app.resolve(ConfigService);
  return { port: configService.get('PORT') || defaultPort };
}

function setupDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('API to handle users registration/login')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token'
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = await configApp(app);
  setupDocs(app);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
