import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Entities from '../../entities'

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 100000,
        baseURL: configService.get('DIRECTUS_LOGISTICS_URI'),
        headers: {
          authorization: `Bearer ${configService.get(
            'DIRECTUS_LOGISTICS_TOKEN',
          )}`,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([...Entities],'MSSQL_CONNECTION')
  ],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule {}
