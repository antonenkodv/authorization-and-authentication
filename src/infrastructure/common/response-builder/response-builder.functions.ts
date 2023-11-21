import { SuccessResponse } from './interfaces/success.response.interface';

export function sendSuccess<T>(data: T): SuccessResponse<T> {
  return {
    response: data,
  };
}
