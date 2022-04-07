import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserBodyDto } from './interfaces/body/create-user-body.dto';
import { GetUserResponse } from './interfaces/response/get-user-response.interface.ts';
import { UserService } from './user.services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* ------------------------------- Create User ------------------------------ */
  @MessagePattern('CREATE_USER')
  public async createUser(user: CreateUserBodyDto): Promise<GetUserResponse> {
    try {
      const result = await this.userService.createUser(user);
      return {
        status: HttpStatus.CREATED,
        message: 'CREATE_USER_OK',
        data: result,
        errors: null,
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'CREATE_USER_BAD_REQUEST',
        data: null,
        errors: [{ code: HttpStatus.BAD_REQUEST, message: e.message || '' }],
        timestamp: new Date().toISOString(),
      };
    }
  }

  /* -------------------------------- Get Users ------------------------------- */
  @MessagePattern('GET_USERS')
  public async getUsers(): Promise<GetUserResponse> {
    try {
      const result = await this.userService.getUsers();
      return {
        status: HttpStatus.OK,
        message: 'GET_USERS_OK',
        data: result,
        errors: null,
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'GET_USERS_INTERNAL_SERVER_ERROR',
        data: null,
        errors: [
          { code: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message || '' },
        ],
        timestamp: new Date().toISOString(),
      };
    }
  }

  /* ---------------------------- Get User By UUID ---------------------------- */
  @MessagePattern('GET_USER_BY_UUID')
  public async getUserByUuid(params: {
    uuid: string;
  }): Promise<GetUserResponse> {
    try {
      const result = await this.userService.getUserByUuid(params.uuid);
      return {
        status: HttpStatus.OK,
        message: 'GET_USER_BY_UUID_OK',
        data: result,
        errors: null,
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'GET_USER_BY_UUID_BAD_REQUEST',
        data: null,
        errors: [{ code: HttpStatus.BAD_REQUEST, message: e.message || '' }],
        timestamp: new Date().toISOString(),
      };
    }
  }

  // /* ---------------------------- Get user by uuid ---------------------------- */
  // @MessagePattern('user_get_by_id')
  // public async getUserById(uuid: string): Promise<IUserSearchResponse> {
  //   let result: IUserSearchResponse;

  //   if (uuid) {
  //     const user = await this.userService.findById(uuid);
  //     if (user) {
  //       result = {
  //         status: HttpStatus.OK,
  //         message: 'user_get_by_id_success',
  //         user,
  //       };
  //     } else {
  //       result = {
  //         status: HttpStatus.NOT_FOUND,
  //         message: 'user_get_by_id_not_found',
  //         user: null,
  //       };
  //     }
  //   } else {
  //     result = {
  //       status: HttpStatus.BAD_REQUEST,
  //       message: 'user_get_by_id_bad_request',
  //       user: null,
  //     };
  //   }

  //   return result;
  // }

  // /* -------------------------------- Get users ------------------------------- */
  // @MessagePattern('user_get_all')
  // public async getUserAll(): Promise<IUserSearchResponse> {
  //   try {
  //     const users = await this.userService.findAll();
  //     return {
  //       status: HttpStatus.OK,
  //       message: 'user_get_all_success',
  //       user: users,
  //     };
  //   } catch (err) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.INTERNAL_SERVER_ERROR,
  //         error: err.message,
  //       },
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
