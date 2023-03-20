import { Logger, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { config } from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import morgan from 'morgan';

config();

const globalPrefix = 'api';
const port = process.env.PORT || 4001;

const configApp = (app: INestApplication) => {
  app.use(morgan('dev'));
  app.use(helmet());
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  return { port: port };
};

async function setupDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('messages-api')
    .setDescription('api that handles all messages and comments')
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
