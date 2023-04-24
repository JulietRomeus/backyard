import { User } from './../../entities/user.entity';
import { Role } from './../../entities/role.entity';
import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import Entities from '../../entities/Index';
import { Unit } from 'src/entities/unit.entity';
import { ConfigService,ConfigModule } from '@nestjs/config';
@Module({
  controllers: [DriverController],
  providers: [DriverService],

  imports: [
    TypeOrmModule.forFeature([...Entities], 'MSSQL_CONNECTION'),
    TypeOrmModule.forFeature([User,Unit,Role], 'PROGRESS'),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 100000,
        baseURL: configService.get('USER_SERVICE_URI'),
        // headers: {
        //   authorization: `Bearer ${configService.get(
        //     'DIRECTUS_LOGISTICS_TOKEN',
        //   )}`,
        // },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DriverModule {}
