import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AuthService } from './service/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern({ cmd: 'login' })
  login(data: any) {
    return this.authService.login(data);
  }

  @EventPattern({ cmd: 'register' })
  register(data: any) {
    return this.authService.register(data);
  }

  @EventPattern({ cmd: 'google_login' })
  googleLogin(data: any) {
    return this.authService.googleLogin(data);
  }
  @EventPattern({ cmd: 'validate' })
  validate(payload: any): Promise<any> {
    return this.authService.validate(payload);
  }
}
