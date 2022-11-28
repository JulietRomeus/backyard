import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { PermissionGuard } from './guards/permission.guard';
import { WarningModule } from './modules/warning/warning.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { ActivityModule } from './modules/activity/activity.module';
<<<<<<< HEAD
import { KhiwqqModule } from './modules/khiwqq/khiwqq.module';
=======
import { AomModule } from './modules/aom/aom.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { RegisterModule } from './modules/register/register.module';
>>>>>>> master

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

<<<<<<< HEAD
    KhiwqqModule
=======
    AomModule,

    VehicleModule,

    RegisterModule,
>>>>>>> master
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
