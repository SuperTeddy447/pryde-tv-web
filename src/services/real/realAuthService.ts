import { apiClient } from '../apiClient';
import type { LoginWithPhonePayload, RegisterPayload, AuthResponse, ForgotPasswordPayload } from '@/types/auth';

export const realAuthService = {
  async loginWithPhone(payload: LoginWithPhonePayload): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/login', payload);
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/register', payload);
    return data;
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.post('/auth/forgot-password', payload);
    return data;
  },

  async loginWithLine(): Promise<AuthResponse> {
    const { data } = await apiClient.get('/auth/line/callback');
    return data;
  },

  async loginWithApple(): Promise<AuthResponse> {
    const { data } = await apiClient.get('/auth/apple/callback');
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },
};
