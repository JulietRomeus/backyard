import { SetMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export type permType = {
  service?: string;
  route: string;
  action: string;
};

export const Permission = (perm?: permType | undefined) =>
  SetMetadata('permission', perm);
