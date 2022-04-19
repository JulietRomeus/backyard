import {
  Controller,
  HttpStatus,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './interfaces/dtos/create-user.dto';
import { GetUserResponse } from './interfaces/dtos/get-user-response.interface.ts';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* ------------------------------- Create User ------------------------------ */
  @MessagePattern('CREATE_USER')
  public async createUser(user: CreateUserDto) {
    await this.userService.createUser(user);
    return {
      status: HttpStatus.CREATED,
      message: 'CREATE_USER_OK',
      data: null,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  /* ------------------------------- Update User ------------------------------ */
  // TODO Update user

  /* ------------------------------- Delete User ------------------------------ */
  // TODO Delete user

  /* -------------------------------- Get Users ------------------------------- */
  @MessagePattern('GET_USERS')
  public async getUsers(): Promise<GetUserResponse> {
    const result = await this.userService.findUsers();
    return {
      status: HttpStatus.OK,
      message: 'GET_USERS_OK',
      data: result,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }

  /* ----------------------------- Get User By ID ----------------------------- */
  @MessagePattern('GET_USER_BY_ID')
  public async getUserById(params: { id: string }): Promise<GetUserResponse> {
    const result = await this.userService.findUser({
      where: { id: params.id },
      relations: ['roles'],
    });
    return {
      status: HttpStatus.OK,
      message: 'GET_USER_BY_ID_OK',
      data: result,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }
}
