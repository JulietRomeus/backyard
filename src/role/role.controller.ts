import { Controller, HttpException, HttpStatus, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern('CREATE_ROLE')
  async create(@Payload() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @MessagePattern('GET_ROLES')
  async findAll() {
    try {
      const getRolesResult = await this.roleService.findAll();
      return {
        status: HttpStatus.OK,
        message: 'GET_ROLES_OK',
        data: getRolesResult,
        errors: null,
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      return new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'GET_ROLES_INTERNAL_SERVER_ERROR',
          data: null,
          errors: [
            {
              code: HttpStatus.INTERNAL_SERVER_ERROR,
              message: e.message || '',
            },
          ],
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @MessagePattern('GET_ROLE_BY_UUID')
  findOne(@Param() uuid: string) {
    try {
      const getRoleByUUIDResult = this.roleService.findByUUID(uuid);
      return {
        status: HttpStatus.OK,
        message: 'GET_ROLE_BY_UUID_OK',
        data: getRoleByUUIDResult,
        errors: null,
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      return new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'GET_ROLE_BY_UUID_BAD_REQUEST',
          data: null,
          errors: [{ code: HttpStatus.BAD_REQUEST, message: e.message || '' }],
          timestamp: new Date().toISOString(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @MessagePattern('UPDATE_ROLE')
  // update(@Payload() updateRoleDto: UpdateRoleDto) {
  //   return this.roleService.update(updateRoleDto.id, updateRoleDto);
  // }

  // @MessagePattern('REMOVE_ROLE')
  // remove(@Payload() id: number) {
  //   return this.roleService.remove(id);
  // }
}
