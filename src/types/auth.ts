export interface LoginWithPhonePayload {
  phone: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordPayload {
  phone: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: import('./user').User;
}

export type LoginProvider = 'phone' | 'line' | 'apple';
