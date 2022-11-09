import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const whitelist = [
      'http://192.168.1.*',
      'http://localhost:3100',
      'http://localhost:9000',
      'https://bigdata.rtarf.maholan.app',
      'https://*.rtarf.maholan.dev',
      'https://bigdata.rtarf.mi.th',
      'https://api1.rtarf.mi.th',
    ];
    app.enableCors({
      origin: (origin, callback) => {
        // console.log('ORIGIN', origin);
        if (!origin || whitelist.indexOf(origin) !== -1) {
          // console.log('allow');
          callback(null, true);
        } else {
          // console.log('not allow');
          callback(new Error('Not allowed by CORS'));
        }
      },
    });
    /* --------------------------------- Global --------------------------------- */
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
    // Filter
    app.useGlobalFilters(new HttpExceptionFilter());

    // Pipe
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('trs-service');

    /* --------------------------------- Swagger -------------------------------- */
    const options = new DocumentBuilder()
      .setTitle('Docs: Transport Service')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'JWT',
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('trs-service/docs', app, document);

    /* --------------------------------- Startup -------------------------------- */
    await app.listen(
      configService.get<number>('PORT') || 3100,
    );
  }
  bootstrap();
}
bootstrap();
