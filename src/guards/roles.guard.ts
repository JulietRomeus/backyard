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

    const userServiceUrl = `${this.configService.get(
      'USER_SERVICE_URI',
    )}/auth/permission`;

    const result = await axios.get(userServiceUrl, {
      headers: { authorization: headers.authorization },
    });
    // console.log('result', result.data);
    const data = result.data;
    if (!data)
      throw new UnauthorizedException(
        result.data.error || 'authorization invalid',
      );
    const payload = data.data;
    // console.log('payload', payload);
    const userRawRoles = payload?.roles || [];

    const userRows = userRawRoles.map((role) => role.name);

    const isAccept = roles.filter((role) => userRows.includes(role));
    if (!isAccept.length && roles.length !== 0)
      throw new UnauthorizedException('authorization role mismatch.');
    const userRawUnits = payload?.units || [];

    const userUnits = userRawUnits.map((unit) => unit);
    req.body = {
      request_by: {
        id: payload?.id,
        displayname: payload?.displayname,
        email: payload?.email,
        roles: userRows,
        units: userUnits,
      },
      ...req.body,
    };
    return true;
  }
}
