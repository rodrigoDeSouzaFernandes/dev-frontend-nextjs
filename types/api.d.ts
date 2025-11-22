import { AxiosError } from "axios";

export interface ApiErrorResponse {
  message?: string;
  error?: string;
}

export type ApiError = AxiosError<ApiErrorResponse | string>;

