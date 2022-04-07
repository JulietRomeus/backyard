export class CreateUserBodyDto {
  username: string;
  password: string;
  sso?: string;
  firstname: string;
  lastname?: string;
  email: string;
  tel?: string;
  idCard?: string;
  avatarUrl?: string;
}
