import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  readonly id: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly tel?: string;
  readonly idCard?: string;
  readonly avatarUrl?: string;
}
