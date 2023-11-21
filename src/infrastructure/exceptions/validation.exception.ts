import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export const validationExceptionFactory = (errors: ValidationError[]) => {
  return new ValidationException(formatError(errors));
};

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: Record<string, string[]>) {
    super(validationErrors);
  }
}

const formatError = (errors: ValidationError[]): Record<string, string[]> => {
  const errMsg = {};
  errors.forEach((error: ValidationError) => {
    errMsg[error.property] = error.children.length
      ? [formatError(error.children)]
      : [...Object.values(error.constraints)];
  });
  return errMsg;
};
