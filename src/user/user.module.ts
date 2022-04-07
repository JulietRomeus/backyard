import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entitys/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.services';

@Module({
  providers: [UserService],
  imports: [
    // Import TypeOrm Feature Module
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
})
export class UserModule {}
