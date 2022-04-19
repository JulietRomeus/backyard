import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { MenuController } from './menu.controller';
import { Menu } from './menu.entity';
import { MenuRepository } from './menu.repository';
import { MenuService } from './menu.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuRepository, MenuService, ...CommandHandlers],
})
export class MenuModule {}
