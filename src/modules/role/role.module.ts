import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { CommandHandlers } from './commands/handlers';
import { User } from '../user/user.entity';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Role, User])],
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleRepository,
    // UserSaga,
    ...CommandHandlers,
    // ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class RoleModule {}
