import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import morgan from 'morgan';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import { config } from 'dotenv';

config();

const globalPrefix = 'api';
const port = process.env.PORT || 4000;

async function configApp(app: INestApplication) {
  app.use(morgan('dev'));
  app.use(helmet());
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  return { port: port };
}

async function setupDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Products-api')
    .setDescription('api that handles all products related')
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
