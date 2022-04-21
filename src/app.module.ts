import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { DepartmentModule } from './modules/department/department.module';

@Module({
  imports: [
    // Import Config
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // Import Postgres
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    // Import Modules
    DepartmentModule,
  ],
})
export class AppModule {}
