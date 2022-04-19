import { UserDto } from 'src/modules/user/interfaces/dtos/user.dto';
import { RoleDto } from './role.dto';

export class CreateRoleDto extends RoleDto {
  userId?: string;
}
