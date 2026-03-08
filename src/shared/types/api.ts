export interface ApiResponse<T = unknown> {
  code: string;
  message: string;
  data?: T;
  errors?: string[];
}

export type ApiSuccess<T> = ApiResponse<T>;

export interface ApiError {
  code: string;
  message: string;
  errors?: string[];
}
