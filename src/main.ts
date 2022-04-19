import { NestFactory } from '@nestjs/core';
import { RpcException, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { TypeOrmExceptionFilter } from './filters/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.USER_API_PORT || 3100,
    },
  });

  app.useGlobalFilters(new TypeOrmExceptionFilter());
  await app.listen();
}
bootstrap();
