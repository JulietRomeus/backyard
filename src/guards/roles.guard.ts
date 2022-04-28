import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';

@Injectable()
export class RolesGuard {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // check is guard provide roles metatada
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const headers = req.headers;

    // check authorization headers
    const authorization = headers.authorization;
    if (!authorization)
      throw new UnauthorizedException('authorization header not provide.');

    const userServiceUrl = `http://${this.configService.get(
      'BASE_URI',
    )}:${this.configService.get('USER_SERVICE_PORT')}/auth/decode`;

    const result = await axios.get(userServiceUrl, {
      headers: { authorization: headers.authorization },
    });

    const data = result.data.data;
    if (!data)
      throw new UnauthorizedException(
        result.data.error || 'authorization invalid',
      );
    const payload = data.payload;

    // roles
    const userRawRoles = payload?.roles || [];
    const userRows = userRawRoles.map((role) => role.namespace);

    const isAccept = roles.filter((role) => userRows.includes(role));
    if (!isAccept.length)
      throw new UnauthorizedException('authorization role mismatch.');

    return true;
  }
}
