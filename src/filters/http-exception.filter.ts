import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const toSnakeCase = (str: string) =>
      str.toUpperCase().replace(/ /g, '_').replace('.', '');
    const isThrowHttpStatus = (e) => typeof e.getStatus === 'function';

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const constructor =
      exception.code ||
      exception.constructor.name ||
      exception.getResponse().message;
    const topic = request.path;

    let status;
    let message;
    let error;

    if (isThrowHttpStatus(exception)) {
      status = (exception as any).getStatus();
      message = toSnakeCase((exception as any).message);
      error = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'INTERNAL_SERVER_ERROR';
      error = exception.message;
    }

    switch (constructor) {
      case 'ECONNREFUSED':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'ECONNREFUSED';
        error = error;
        break;

      case 'NotFoundException':
        status = HttpStatus.NOT_FOUND;
        message = 'NOT_FOUND';
        error = error;
        break;

      case 'invalid_grant':
        status = HttpStatus.NOT_ACCEPTABLE;
        message = 'NOT_ACCEPTABLE';
        error = error;
        return response.redirect('/auth/google');

      case 'QueryFailedError':
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = 'UNPROCESSABLE_ENTITY';
        error = (exception as QueryFailedError).message;
        break;
    }

    // Logger.error(`[${topic}] ${error}`, 'Gateway');
    // return response.status(status).json({
    //   status,
    //   // message: `${message}`,
    //   // data: topic,
    //   error: error,
    //   // timestamp: new Date().toISOString(),
    // });
    return response.redirect('https://bigdata.rtarf.mi.th/360');
  }
}
