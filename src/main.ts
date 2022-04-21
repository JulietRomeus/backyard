import { NestFactory } from '@nestjs/core';
import { RpcException, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.DIASASTER_SERVICE_PORT || 3300,
    },
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen();
}
bootstrap();
