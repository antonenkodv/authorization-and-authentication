import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { ErrorResponse } from './interfaces/error-response.interface';

const {
  PrismaClientRustPanicError,
  PrismaClientValidationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
} = Prisma;

const prismaErrorStatusMap = new Map<string, number>([
  [PrismaClientRustPanicError.name, HttpStatus.BAD_REQUEST],
  [PrismaClientValidationError.name, HttpStatus.UNPROCESSABLE_ENTITY],
  [PrismaClientKnownRequestError.name, HttpStatus.BAD_REQUEST],
  [PrismaClientUnknownRequestError.name, HttpStatus.BAD_REQUEST],
  [PrismaClientInitializationError.name, HttpStatus.BAD_REQUEST],
]);

@Catch(
  PrismaClientRustPanicError,
  PrismaClientValidationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorMessage: string = exception.message.replace(/\n/g, '');
    const statusCode: number = prismaErrorStatusMap.get(exception.constructor.name);

    const errorResponse: ErrorResponse = {
      code: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      error: errorMessage,
    };

    response.status(statusCode).json(errorResponse);
  }
}
