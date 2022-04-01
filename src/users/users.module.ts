import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/config/typeorm-config.service';
import { User } from 'src/users/entitys/user.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.services';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    // Import GraphQL Module
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),

    // Import TypeOrm Feature Module
    TypeOrmModule.forFeature([User]),
  ],
})
export class UserModule {}
