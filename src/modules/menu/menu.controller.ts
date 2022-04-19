import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IResponse } from 'src/common/interfaces/response.interface';
import { CreateMenuDto } from './interfaces/dtos/create-menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /* ------------------------------- Create Menu ------------------------------ */
  @MessagePattern('CREATE_MENU')
  public async createRole(menuDto: CreateMenuDto): Promise<IResponse> {
    const result = await this.menuService.createMenu(menuDto);
    return {
      status: HttpStatus.CREATED,
      message: 'CREATE_MENU_OK',
      data: result,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }
}
