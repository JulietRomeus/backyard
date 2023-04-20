import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TrsDashboard } from './entities/dashboard.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import Entities from '../../entities/Index';

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

    TypeOrmModule.forRootAsync({
      name: 'MSSQL_CONNECTION_HOST',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('MSSQL_CONNECTION_HOST'),
        // port: 1433,
        database: configService.get('MSSQL_DATABASE_NAME'),
        username: configService.get('MSSQL_USERNAME'),
        password: configService.get('MSSQL_PASSWORD'),
        entities: [__dirname + './entities/*.entity{.ts,.js}'],
        synchronize: false, //DONOT set to true
        extra: {
          trustServerCertificate: true,
        },
      }),
    }),

    TypeOrmModule.forFeature([TrsDashboard], 'MSSQL_CONNECTION_HOST'),
    TypeOrmModule.forFeature([...Entities], 'MSSQL_CONNECTION'),
  ],

  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
