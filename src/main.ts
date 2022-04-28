import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    /* --------------------------------- Global --------------------------------- */
    // Filter
    app.useGlobalFilters(new HttpExceptionFilter());

    // Pipe
    app.useGlobalPipes(new ValidationPipe());

    /* --------------------------------- Swagger -------------------------------- */
    const options = new DocumentBuilder()
      .setTitle('Docs: Disaster Service')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'JWT',
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    /* --------------------------------- Startup -------------------------------- */
    await app.listen(
      configService.get<number>('DIASASTER_MONITORING_SERVICE_PORT') || 3310,
    );
  }
  bootstrap();
}
bootstrap();
