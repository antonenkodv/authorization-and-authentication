interface GeneralErrorResponse {
  code: number;
  error: string;
}
interface ValidationErrorResponse extends GeneralErrorResponse {
  errors: Record<string, string[]>;
}
export type ErrorResponse = ValidationErrorResponse | GeneralErrorResponse;
export {};
