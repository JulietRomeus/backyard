import { Module } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { LedgerController } from './ledger.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Entities from 'src/entities/Index';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forFeature([...Entities], 'MSSQL_CONNECTION'),
  ],
  controllers: [LedgerController],
  providers: [LedgerService, VehicleService],
})
export class LedgerModule {}
