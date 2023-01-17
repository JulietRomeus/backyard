import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { PermissionGuard } from './guards/permission.guard';
import { WarningModule } from './modules/warning/warning.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { ActivityModule } from './modules/activity/activity.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { RegisterModule } from './modules/register/register.module';
import { DriverModule } from './modules/driver/driver.module';
import { ObstacleModule } from './modules/obstacle/obstacle.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from './entities';
@Module({
  imports: [
    // Import Config

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // Import Modules

    WarningModule,

    TrackingModule,

    ActivityModule,

    VehicleModule,

    RegisterModule,

    DriverModule,
    
    ObstacleModule,

    TypeOrmModule.forRootAsync({
      name: 'MSSQL_CONNECTION',
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('MSSQL_CONNECTION_HOST'),
        database: configService.get('MSSQL_DATABASE_NAME'),
        username: configService.get('MSSQL_USERNAME'),
        password: configService.get('MSSQL_PASSWORD'),

        entities: [...Entities],

        synchronize: false, //DONOT set to true
        // migrationsRun: true,
        extra: {
          trustServerCertificate: true,
        },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
