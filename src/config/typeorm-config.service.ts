import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Position } from 'src/position/entitys/position.entity';
import { User } from 'src/user/entitys/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService();
    return {
      type: 'postgres',
      url: configService.get<string>('POSTGRES_SERVICE_URL'),
      entities: [User, Position],
      migrations: [__dirname + ['/**/migrations/*.{.ts,.js}']],
      cli: {
        migrationsDir: 'src/migrations',
      },

      // enable schema sync in development mode
      synchronize:
        configService.get<string>('NODE_ENV') === 'development' ? true : false,
    };
  }
}
