import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { UserModule } from './users/users.module';

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

    // Import User Module
    UserModule,
  ],
})
export class AppModule {}
