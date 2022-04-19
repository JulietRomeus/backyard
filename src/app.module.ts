import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';
import { AuthModule } from './modules/auth/auth.module';

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
    RoleModule,
    MenuModule,
    AuthModule,
  ],
})
export class AppModule {}
