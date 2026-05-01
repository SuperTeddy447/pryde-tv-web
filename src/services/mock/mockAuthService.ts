import type { AuthResponse, LoginWithPhonePayload, RegisterPayload, ForgotPasswordPayload } from '@/types/auth';
import { mockUser } from './mockData';

const delay = () => {
  const ms = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
  return new Promise((res) => setTimeout(res, ms));
};

export const mockAuthService = {
  async loginWithPhone(payload: LoginWithPhonePayload): Promise<AuthResponse> {
    await delay();
    if (payload.phone === '0000000000') {
      throw new Error('Invalid phone number or password');
    }
    return {
      token: 'mock_token_' + Date.now(),
      refreshToken: 'mock_refresh_' + Date.now(),
      user: { ...mockUser, phone: payload.phone },
    };
  },

  async loginWithLine(): Promise<AuthResponse> {
    await delay();
    return {
      token: 'mock_line_token_' + Date.now(),
      refreshToken: 'mock_line_refresh_' + Date.now(),
      user: { ...mockUser, name: 'LINE User' },
    };
  },

  async loginWithApple(): Promise<AuthResponse> {
    await delay();
    return {
      token: 'mock_apple_token_' + Date.now(),
      refreshToken: 'mock_apple_refresh_' + Date.now(),
      user: { ...mockUser, name: 'Apple User' },
    };
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    await delay();
    return {
      token: 'mock_token_' + Date.now(),
      refreshToken: 'mock_refresh_' + Date.now(),
      user: { ...mockUser, name: payload.name, phone: payload.phone },
    };
  },

  async forgotPassword(_payload: ForgotPasswordPayload): Promise<{ success: boolean; message: string }> {
    await delay();
    return { success: true, message: 'OTP sent to your phone' };
  },

  async logout(): Promise<void> {
    await delay();
  },
};
