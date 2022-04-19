import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';

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
    UserModule,
    PositionModule,
    AuthModule,
    RoleModule,
    MenuModule,
  ],
})
export class AppModule {}
