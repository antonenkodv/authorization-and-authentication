import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from './interfaces/error-response.interface';
import { SessionException } from '../../exceptions/session.exception';

@Catch(SessionException)
export class SessionExceptionsFilter implements ExceptionFilter {
  catch(exception: SessionException & { status?: number; code?: number }, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.status;
    const errorMessage = exception.message;

    const errorResponse: ErrorResponse = {
      code: statusCode,
      error: errorMessage,
    };

    response.status(statusCode).json(errorResponse);
  }
}
