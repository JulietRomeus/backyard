import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { PermissionGuard } from './guards/permission.guard';

import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from './entities/Index';

import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Unit } from './entities/unit.entity';
import { ExampleModule } from './modules/example/example.module';

@Module({
  imports: [
    // Import Config

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ExampleModule,

    // Import Modules
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
