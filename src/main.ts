import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

require('dotenv').config();

async function start() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.enableShutdownHooks();

  await app.listen(process.env.PORT);
  console.log(`Server running on: ${await app.getUrl()}`);
}

start().catch((error) => console.log(error));
