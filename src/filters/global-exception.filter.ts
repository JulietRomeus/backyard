import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CommandHandlerNotFoundException,
  InvalidCommandHandlerException,
  InvalidEventsHandlerException,
  InvalidQueryHandlerException,
  InvalidSagaException,
  QueryHandlerNotFoundException,
} from '@nestjs/cqrs';
import { KafkaContext, TcpContext } from '@nestjs/microservices';
import { IResponse } from 'src/common/interfaces/response.interface';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): IResponse {
    const ctx = host.switchToRpc();
    const context = ctx.getContext() as KafkaContext | TcpContext;
    const topic = context.getArgs()[1] || 'UNKNOWN';

    const toSnakeCase = (str: string) => str.toUpperCase().replace(/ /g, '_');
    const isThrowHttpStatus = (e) => typeof e.getStatus === 'function';

    let status;
    let message;
    let error = (exception as any).message;

    if (isThrowHttpStatus(exception)) {
      status = (exception as any).getStatus();
      message = toSnakeCase((exception as any).message);
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'INTERNAL_SERVER_ERROR';
    }
    // let status = isThrowHttpStatus(exception)
    //   ?
    //   : HttpStatus.INTERNAL_SERVER_ERROR;
    // let message =
    //    || 'INTERNAL_SERVER_ERROR';

    switch (exception.constructor || exception.constructor.name) {
      /* ---------------------------- TypeOrmException ---------------------------- */
      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = 'UNPROCESSABLE_ENTITY';
        error = (exception as QueryFailedError).message;
        break;

      /* ----------------------------- CQRS Exception ----------------------------- */
      case CommandHandlerNotFoundException:
        status = HttpStatus.NOT_FOUND;
        message = 'COMMAND_HANDLER_NOT_FOUND';
        error = (exception as CommandHandlerNotFoundException).message;
        break;
      case InvalidCommandHandlerException:
        status = HttpStatus.NOT_FOUND;
        message = 'INVALID_COMMAND_HANDLER';
        error = (exception as InvalidCommandHandlerException).message;
        break;
      case InvalidEventsHandlerException:
        status = HttpStatus.NOT_FOUND;
        message = 'INVALID_EVENT_HANDLER';
        error = (exception as InvalidEventsHandlerException).message;
        break;
      case InvalidQueryHandlerException:
        status = HttpStatus.NOT_FOUND;
        message = 'INVALID_QUERY_HANDLER';
        error = (exception as InvalidQueryHandlerException).message;
        break;
      case InvalidSagaException:
        status = HttpStatus.NOT_FOUND;
        message = 'INVALID_SAGA';
        error = (exception as InvalidSagaException).message;
        break;
      case InvalidSagaException:
        status = HttpStatus.NOT_FOUND;
        message = 'INVALID_SAGA';
        error = (exception as InvalidSagaException).message;
        break;
      case QueryHandlerNotFoundException:
        status = HttpStatus.NOT_FOUND;
        message = 'QUERY_NOT_FOUND';
        error = (exception as QueryHandlerNotFoundException).message;
        break;
    }

    Logger.warn(`[${topic}] ${error}`, 'ErrorHandlers');

    return {
      status,
      message: `${topic}_${message}`,
      data: null,
      error: error,
      timestamp: new Date().toISOString(),
    };
  }
}
