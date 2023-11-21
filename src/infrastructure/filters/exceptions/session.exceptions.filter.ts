import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Request, Response } from 'express';
import { ErrorResponse } from './interfaces/error-response.interface';
import { SessionException } from '../../exceptions/session.exception';

@Catch(SessionException)
export class SessionExceptionsFilter implements ExceptionFilter {
  catch(
    exception: SessionException & { status?: number; code?: number },
    host: ArgumentsHost,
  ): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request & { user: any }>();
    const response = ctx.getResponse<Response>();
    const statusCode =HttpStatus.INTERNAL_SERVER_ERROR;

      console.log('SessionExceptionsFilter',request.user.id)

    const errorResponse: ErrorResponse = {
      code: statusCode,
      error: 'Something went wrong. Please, try again later',
    };
    response.status(statusCode).json(errorResponse);
  }
}
