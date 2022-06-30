import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[] | undefined) =>
  SetMetadata('roles', roles);
