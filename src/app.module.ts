import { HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { TeamModule } from './modules/team/team.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    // Import Config

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // Import Modules
    TeamModule,

    EventModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
