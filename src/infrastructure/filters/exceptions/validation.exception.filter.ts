import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { ErrorResponse } from './interfaces/error-response.interface';
import { ValidationException } from '../../exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.BAD_REQUEST;
    const errors: Record<string, string[]> = exception.validationErrors;

    const errorResponse: ErrorResponse = {
      code: statusCode,
      error: 'Request data is invalid',
      errors: errors,
    };

    response.status(statusCode).json(errorResponse);
  }
}
