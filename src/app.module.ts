import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { PermissionGuard } from './guards/permission.guard';
import { WarningModule } from './modules/warning/warning.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { ActivityModule } from './modules/activity/activity.module';
import { ArtpoporModule } from './modules/artpopor/artpopor.module';

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

    ArtpoporModule,
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
