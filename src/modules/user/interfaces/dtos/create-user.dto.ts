export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly sso?: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly email: string;
  readonly tel?: string;
  readonly idCard?: string;
  readonly avatarUrl?: string;
}
