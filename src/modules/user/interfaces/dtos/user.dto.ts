import { Expose } from 'class-transformer';
import { AbstractDto } from 'src/common/interfaces/dto/abstract.dto';

export class UserDto extends AbstractDto {
  @Expose()
  readonly username: string;

  @Expose()
  readonly password: string;

  @Expose()
  readonly sso?: string;

  @Expose()
  readonly firstname?: string;

  @Expose()
  readonly lastname?: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly tel?: string;

  @Expose()
  readonly idCard?: string;

  @Expose()
  readonly avatarUrl?: string;
}
