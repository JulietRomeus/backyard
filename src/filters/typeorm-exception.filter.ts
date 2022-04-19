import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CommandHandlerNotFoundException } from '@nestjs/cqrs';
import { KafkaContext, TcpContext } from '@nestjs/microservices';
import { IResponse } from 'src/common/interfaces/response.interface';
import { QueryFailedError } from 'typeorm';

@Catch()
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): IResponse {
    const ctx = host.switchToRpc();
    const context = ctx.getContext() as KafkaContext | TcpContext;
    const topic = context.getArgs()[1] || 'UNKNOWN';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'INTERNAL_SERVER_ERROR';
    let error = (exception as any).message;

    /* ---------------------------- TypeORM Exception --------------------------- */
    switch (exception.constructor || exception.constructor.name) {
      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = 'UNPROCESSABLE_ENTITY';
        error = (exception as QueryFailedError).message;
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'INTERNAL_SERVER_ERROR';
        error = (exception as any).message;
        break;
    }

    Logger.warn(`[${topic}] ${error}`, 'TypeORM');

    return {
      status,
      message: `${topic}_${message}`,
      data: null,
      error: error,
      timestamp: new Date().toISOString(),
    };
  }
}
