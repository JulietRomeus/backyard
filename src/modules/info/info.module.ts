import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 100000,
        baseURL: configService.get('DIRECTUS_DISASTER_URI'),
        headers: {
          authorization: `Bearer ${configService.get(
            'DIRECTUS_DISASTER_ACCESS_TOKEN',
          )}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
