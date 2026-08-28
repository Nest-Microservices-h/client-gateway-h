import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { envs } from './config';


async function bootstrap() {
  const logger = new Logger("Main-Gateway");
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(envs.PORT);
  logger.log(`Gateway running on port ${envs.PORT}`);
}
bootstrap();
