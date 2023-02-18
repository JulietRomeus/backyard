import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import {TrsDashboard} from './entities/dashboard.entity'
import { ConfigModule, ConfigService } from '@nestjs/config';
 

@Module({
  imports: [ 
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
        entities: [__dirname + './entities/*.entity{.ts,.js}',],
        synchronize: false, //DONOT set to true
        extra: {
          trustServerCertificate: true,
        }
      })
    }),
    TypeOrmModule.forFeature([
      TrsDashboard
    ],
     'MSSQL_CONNECTION_HOST')],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule { }
