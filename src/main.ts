import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1/api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      always: true,
      forbidNonWhitelisted: true,//
      forbidUnknownValues: true
    }),
  )
  await app.listen(process.env.PORT ?? 3000);
}
main();
