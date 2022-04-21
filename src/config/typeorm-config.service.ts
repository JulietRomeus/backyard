import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Department } from 'src/modules/department/department.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService();

    return {
      type: 'postgres',
      entities: [Department],
      migrations: [__dirname + ['/**/migrations/*.{.ts,.js}']],
      replication: {
        master: {
          host: configService.get<string>('POSTGRES_MASTER_HOST'),
          port: configService.get<number>('POSTGRES_MASTER_PORT'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DB'),
        },
        slaves: [
          {
            host: configService.get<string>('POSTGRES_SLAVE_HOST'),
            port: configService.get<number>('POSTGRES_SLAVE_PORT'),
            username: configService.get<string>('POSTGRES_USER'),
            password: configService.get<string>('POSTGRES_PASSWORD'),
            database: configService.get<string>('POSTGRES_DB'),
          },
        ],
      },
      cli: {
        migrationsDir: 'src/migrations',
      },

      // enable schema sync in development mode
      synchronize: true, // configService.get<string>('NODE_ENV') === 'development' ? true : false,
    };
  }
}
