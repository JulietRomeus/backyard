import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { User } from 'src/user/entitys/user.entity';
import { TypeORMError } from 'typeorm';

@Catch(RpcException)
export class RpcCustomException implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message: string = (exception as TypeORMError).message;
    const code: number = (exception as any).code;

    const exceptionResponse: User | User[] | null = [];
  }
}
