
interface SuccessObjectResponse<T> {
  response: T;
}

interface SuccessArrayResponse<T> {
  response: T[];
}

export type SuccessResponse<T> = SuccessObjectResponse<T> | SuccessArrayResponse<T>;
