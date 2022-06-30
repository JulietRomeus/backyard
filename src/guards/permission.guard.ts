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
import { permType } from 'src/decorators/permission.decorator';

@Injectable()
export class PermissionGuard {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // check is guard provide roles metatada
    const perm = this.reflector.get<permType>(
      'permission',
      context.getHandler(),
    );

    if (!perm) return true;
    if (!perm.service) {
      perm.service = this.configService.get('DEFAULT_SERVICE_NAME');
    }
    // console.log('PERM', perm);

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const headers = req.headers;

    // check authorization headers
    const authorization = headers.authorization;
    if (!authorization)
      throw new UnauthorizedException('authorization header not provide.');

    const userServiceUrl = `${this.configService.get(
      'USER_SERVICE_URI',
    )}/permission`;

    const result = await axios.get(userServiceUrl, {
      headers: { authorization: headers.authorization },
    });
    // console.log('result', result.data);
    const data = result.data;
    if (!data)
      throw new UnauthorizedException(
        result.data.error || 'authorization invalid',
      );

    if (
      !(
        data.action_permission[perm.service][perm.route][perm.action] ||
        data.action_permission[perm.service][perm.route]['master']
      )
    ) {
      throw new UnauthorizedException('authorization role mismatch.');
    }

    req.body = {
      request_by: data.request_by,
      ...req.body,
    };
    return true;
  }
}
