import {
  Controller,
  UseFilters,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { AuthService } from './service/auth.service';
import { AllExceptionsFilter } from './rpc-exception.filter';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern({ cmd: 'login' })
  login(data: any) {
    return this.authService.login(data);
  }

  @EventPattern({ cmd: 'register' })
  register(data: any) {
    return this.authService.register(data);
  }

  @EventPattern({ cmd: 'google_login' })
  googleLogin(data: any) {
    return this.authService.googleLogin(data);
  }

  @UseFilters(new AllExceptionsFilter())
  @EventPattern({ cmd: 'validate' })
  validate(payload: any): Promise<any> {
    throw new RpcException({
      status: HttpStatus.BAD_REQUEST,
      message: 'GET_USER_BY_UUID_BAD_REQUEST',
      data: null,
      errors: [{ code: HttpStatus.BAD_REQUEST, message: '' }],
      timestamp: new Date().toISOString(),
    });
    // return this.authService.validate(payload);
  }
}
