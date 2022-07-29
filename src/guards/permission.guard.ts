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

    // if (!perm.service) {

    //   perm.service = 'task';
    // }
    // console.log('PERM', perm);

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const headers = req.headers;

    // check authorization headers
    const authorization = headers.authorization;
    if (!authorization)
      throw new UnauthorizedException('authorization header not provide.');

    if (!perm) {
      const userServiceUrl = `${this.configService.get(
        'USER_SERVICE_URI',
      )}/permission/`;
      const result = await axios.get(userServiceUrl, {
        headers: { authorization: headers.authorization },
      });
      const data = result.data;

      if (!data)
        throw new UnauthorizedException(
          result.data.error || 'authorization invalid',
        );
      req.body = {
        request_by: { ...data },
        ...req.body,
      };
      return true;
    }

    if (!perm.service) {
      perm.service = this.configService.get('DEFAULT_SERVICE_NAME');
    }

    const userServiceUrl = `${this.configService.get(
      'USER_SERVICE_URI',
    )}/permission/${perm.service}/${perm.route}`;

    const result = await axios.get(userServiceUrl, {
      headers: { authorization: headers.authorization },
    });

    // console.log('result', result.data);
    const data = result.data;
    // console.log('>>>perm', data);
    if (!data)
      throw new UnauthorizedException(
        result.data.error || 'authorization invalid',
      );

    try {
      if (
        !(
          data.action_permission[perm.service][perm.route][perm.action] ||
          data.action_permission[perm.service][perm.route]['master']
        )
      ) {
        throw new UnauthorizedException('authorization role mismatch.');
      }
    } catch {
      throw new UnauthorizedException('authorization role mismatch.');
    }
    let filter = '';
    if (data.data_permission[perm.service][perm.route].all) {
      filter = 'all';
    }
    if (data.data_permission[perm.service][perm.route].unit_child) {
      filter = 'unit_child';
    }
    if (data.data_permission[perm.service][perm.route].unit) {
      filter = 'unit';
    }
    if (data.data_permission[perm.service][perm.route].self) {
      filter = 'self';
    }
    req.body = {
      request_by: {
        ...data.request_by,
        data_permission: data.data_permission,
        token: headers.authorization,
        filter: filter,
      },
      ...req.body,
    };

    return true;
  }
}
