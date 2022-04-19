import { Request } from 'express';

export interface IResponse<T = any> {
  status: number;
  message: string;
  data: Promise<T>;
  error: any;
  timestamp?: string;
}

export interface IResponse2 {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

export const TypeOrmResponseError: (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
) => IResponse2 = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
): IResponse2 => {
  return {
    statusCode: statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
  };
};
