import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IResponse } from 'src/common/interfaces/response.interface';
import { CreateRoleDto } from './interfaces/dtos/create-role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /* ------------------------------- Create Role ------------------------------ */
  @MessagePattern('CREATE_ROLE')
  public async createRole(payload: CreateRoleDto): Promise<IResponse> {
    const result = await this.roleService.createRole(payload);
    return {
      status: HttpStatus.CREATED,
      message: 'CREATE_ROLE_OK',
      data: result,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  /* -------------------------------- Get Roles ------------------------------- */
  @MessagePattern('GET_ROLES')
  public async getRoles(): Promise<IResponse> {
    const result = await this.roleService.getRoles();
    return {
      status: HttpStatus.CREATED,
      message: 'GET_ROLES_OK',
      data: result,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  /* -------------------------------- Get Role -------------------------------- */
  @MessagePattern('GET_ROLE_BY_ID')
  public async getRole(id: string): Promise<IResponse> {
    const result = await this.roleService.getRole(id);
    return {
      status: HttpStatus.CREATED,
      message: 'GET_ROLE_BY_ID_OK',
      data: result,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }
}
