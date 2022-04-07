import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { PositionModule } from './position/position.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Import Config
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),

    // Import Postgres Connection Service
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    // Modules
    UserModule,
    PositionModule,
  ],
})
export class AppModule {}
