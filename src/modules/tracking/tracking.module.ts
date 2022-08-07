import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { TrackingGateway } from './tracking.gateway';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[TrackingGateway],
  // imports: [
  //   HttpModule.registerAsync({
  //     imports: [ConfigModule],
  //     useFactory: async (configService: ConfigService) => ({
  //       timeout: 10000,
  //       baseURL: configService.get('DIRECTUS_DISASTER_URI'),
  //       headers: {
  //         authorization: `Bearer ${configService.get(
  //           'DIRECTUS_DISASTER_ACCESS_TOKEN',
  //         )}`,
  //       },
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
  controllers: [TrackingController],
  providers: [TrackingGateway, TrackingService],
})
export class TrackingModule {}
