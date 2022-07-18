import { Module } from '@nestjs/common';
import { WarningService } from './warning.service';
import { WarningController } from './warning.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 10000,
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
  controllers: [WarningController],
  providers: [WarningService]
})
export class WarningModule {}
