import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async register({ email, password }: any): Promise<any> {
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }

    user = new User();

    user.email = email;
    user.password = this.jwtService.encodePassword(password);

    await this.repository.save(user);

    return { status: HttpStatus.CREATED, error: null };
  }

  public async login({ email, password }: any): Promise<any> {
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['E-Mail not found'],
        token: null,
      };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Password wrong'],
        token: null,
      };
    }

    const token: string = this.jwtService.generateToken(user);

    return { token, status: HttpStatus.OK, error: null };
  }

  public async googleLogin({ email }: any): Promise<any> {
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['E-Mail not found'],
        token: null,
      };
    }
    const token: string = this.jwtService.generateToken(user);

    return { token, status: HttpStatus.OK, error: null };
  }

  public async validate({ token }: any): Promise<any> {
    const decoded: User = await this.jwtService.verify(token);

    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };
    }

    const user: User = await this.jwtService.validateUser(decoded);

    if (!user) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User not found'],
        userId: null,
      };
    }

    return { status: HttpStatus.OK, error: null, user: user };
  }
}
