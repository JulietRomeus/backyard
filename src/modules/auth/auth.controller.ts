import {
  BadRequestException,
  Controller,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from '../user/interfaces/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../user/queries/impl/get-user.query';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly queryBus: QueryBus,
  ) {}
  /* ----------------------------- Login By Google ---------------------------- */
  @MessagePattern('LOGIN_AUTH_BY_GOOGLE')
  public async loginAuthByGoogle(authDto) {
    const user = await this.authService.loginAuthByGoogle(authDto);
    const token = await this.authService.generateToken(user);

    return {
      status: HttpStatus.OK,
      message: 'LOGIN_AUTH_BY_GOOGLE_OK',
      data: token,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  /* ----------------------------- Get User By Me ----------------------------- */
  // @UseGuards(AuthGuard)
  @MessagePattern('GET_USER_BY_ME')
  public async getUserByMe(payload): Promise<any> {
    const authentication = payload.authentication;

    if (!authentication)
      throw new UnauthorizedException('Authentication not found');

    const token = authentication.substring(7, authentication.length);
    const decode = (await this.authService.decodeToken(token)) as any;

    if (!decode) throw new UnauthorizedException();

    const data = decode.payload;
    const user = await this.queryBus.execute(
      new GetUserQuery({
        where: { id: data.id },
        relations: ['roles', 'roles.menus'],
      }),
    );

    return {
      status: HttpStatus.OK,
      message: 'GET_USER_BY_ME_OK',
      data: user,
      errors: null,
      timestamp: new Date().toISOString(),
    };
  }
}
