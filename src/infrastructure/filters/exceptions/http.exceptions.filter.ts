import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from './interfaces/error-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('HttpException');

    const data: ErrorResponse = {
      code: exception.getStatus(),
      error: exception.message,
    };

    response
      .status(exception.getStatus())
      .json(data);
  }
}
