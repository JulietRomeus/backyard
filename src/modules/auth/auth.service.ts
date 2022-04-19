import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/interfaces/dtos/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async loginAuthByGoogle(authDto) {
    // find user
    let user = await this.userService.findUser({
      where: { email: authDto.email },
    });

    // create user if not exist
    if (!user) {
      authDto.password = ''; // assign dummpy password
      authDto.sso = 'gmail'; // assign sso with google

      await this.userService.createUser(authDto);
      user = await this.userService.findUser({
        where: { email: authDto.email },
      });
    }

    return user;
  }

  public async generateToken(user: UserDto): Promise<string> {
    return await this.jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: `${user.firstname} ${user.lastname || ''}`,
        avatarUrl: user.avatarUrl,
      },
      { secret: this.configService.get('JWT_SECRET') },
    );
  }

  public async decodeToken(token: string) {
    return (await this.jwt.decode(token, { complete: true })) as Record<
      string,
      any
    > | null;
  }
}
