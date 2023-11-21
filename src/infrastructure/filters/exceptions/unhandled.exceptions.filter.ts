import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Response } from 'express';
import { ErrorResponse } from './interfaces/error-response.interface';

@Catch()
export class UnhandledExceptionFilter implements ExceptionFilter {
  catch(exception: Error & { status?: number; code?: number }, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    // const request = ctx.getRequest<Request & { user: any }>();
    const response = ctx.getResponse<Response>();
    const statusCode = exception?.status || exception?.code || HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ErrorResponse = {
      code: statusCode,
      error: exception?.message || 'Something went wrong. Please, try again later',
    };
    response.status(statusCode).json(errorResponse);
  }
}
