export type Maybe<T> = T | null | undefined;

export interface User {
  id: string;
  name: string;
  email?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
