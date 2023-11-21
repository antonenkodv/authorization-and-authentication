// import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
// import { ValidationError } from 'class-validator';
// import { Response } from 'express';
// import { ErrorResponse } from './interfaces/error-response.interface';
//
// @Catch(ValidationError)
// export class ValidationExceptionFilter implements ExceptionFilter {
//   catch(exception: ValidationError, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//
//     const errorMessage = this.flattenValidationErrors(exception);
//     console.log('ValidationExceptionFilter');
//
//     const errorResponse: ErrorResponse = {
//       code: HttpStatus.BAD_REQUEST,
//       // errors: errorMessage,
//     };
//
//     response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
//   }
//
//   private flattenValidationErrors(errors: ValidationError): string[] {
//     const allErrors: string[] = [];
//
//     if (errors.constraints) {
//       Object.values(errors.constraints).forEach((message) => {
//         allErrors.push(message);
//       });
//     }
//
//     if (errors.children && errors.children.length) {
//       errors.children.forEach((childError) => {
//         const childErrors = this.flattenValidationErrors(childError);
//         allErrors.push(...childErrors);
//       });
//     }
//
//     return allErrors;
//   }
// }
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { ErrorResponse } from './interfaces/error-response.interface';

export class OverrideValidationError extends ValidationError {
  constructor(public validations: ValidationError[]) {
    super();
  }
}

@Catch(OverrideValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: OverrideValidationError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;
    console.log('ValidationExceptionFilter');
    console.log(exception, 'exception');
    // const errors: Record<string, string[]> = Object.fromEntries(
    //   exception.validations.map(validation => {
    //     return [
    //       validation.property,
    //       Object.values(validation.constraints)
    //     ]
    //   })
    // );

    const data: ErrorResponse = {
      code: status,
      error: 'Request data is invalid',
      // errors: errors
    };

    response.status(status).json(data);
  }
}
