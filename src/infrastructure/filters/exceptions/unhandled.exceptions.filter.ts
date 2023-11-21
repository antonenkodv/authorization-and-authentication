import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Request, Response } from 'express';
import { ErrorResponse } from './interfaces/error-response.interface';

@Catch()
export class UnhandledExceptionFilter implements ExceptionFilter {

  catch(exception: Error, host: ArgumentsHost): any {
    console.log('UnhandledExceptionFilter');
    console.log(exception);
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request & { user: any }>();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const data: ErrorResponse = {
      code: status,
      error: 'Something went wrong. Please, try again later',
    };

    response.status(status).json(data);
  }
}
