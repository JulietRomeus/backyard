import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { DivisionModule } from './modules/division/division.module';

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
    DivisionModule,
  ],
})
export class AppModule {}
