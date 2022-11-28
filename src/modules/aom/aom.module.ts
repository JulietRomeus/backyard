import { Module } from '@nestjs/common';
import { AomService } from './aom.service';
import { AomController } from './aom.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 100000,
        baseURL: configService.get('DIRECTUS_LOGISTICS_URI'),
        headers: {
          authorization: `Bearer ${configService.get(
            'DIRECTUS_LOGISTICS_TOKEN',
          )}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AomController],
  providers: [AomService],
})
export class AomModule {}
