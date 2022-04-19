// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   public async canActivate(ctx: ExecutionContext): Promise<boolean | never> {
//     const req: Request = ctx.switchToHttp().getRequest();
//     console.log(req);
//     const authorization: string = req.headers['authorization'];

//     if (!authorization) {
//       throw new UnauthorizedException();
//     }

//     const bearer: string[] = authorization.split(' ');

//     if (!bearer || bearer.length < 2) {
//       throw new UnauthorizedException();
//     }

//     const token: string = bearer[1];
//     console.log(token);

//     // const { status, userId }: ValidateResponse = await this.service.validate(
//     //   token,
//     // );

//     // req.user = userId;

//     // if (status !== HttpStatus.OK) {
//     //   throw new UnauthorizedException();
//     // }

//     return true;
//   }
// }
