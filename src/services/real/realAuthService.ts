import { apiClient } from '../apiClient';
import type { LoginWithPhonePayload, RegisterPayload, AuthResponse, ForgotPasswordPayload } from '@/types/auth';

export const realAuthService = {
  async loginWithPhone(payload: LoginWithPhonePayload): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/member/login-v2', payload);
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/member/register-v2', payload);
    return data;
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.put('/auth/resetPasswordMember', payload);
    return data;
  },

  async loginWithLine(payload?: any): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/member/login', payload || {});
    return data;
  },

  async loginWithApple(payload?: any): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/member/login-v3', payload || {});
    return data;
  },

  async sendOTP(payload: { phone: string }): Promise<any> {
    const { data } = await apiClient.post('/auth/member/send-otp', payload);
    return data;
  },

  async verifyOTP(payload: { phone: string; otp: string }): Promise<any> {
    const { data } = await apiClient.post('/auth/member/verify-otp', payload);
    return data;
  },

  async checkPin(payload: { pin: string }): Promise<any> {
    const { data } = await apiClient.put('/auth/member/checkPin', payload);
    return data;
  },

  async createPin(payload: { pin: string }): Promise<any> {
    const { data } = await apiClient.put('/auth/member/createPin', payload);
    return data;
  },

  async logout(): Promise<void> {
    // Backend might not have a logout endpoint in the old system, handled locally
    // but just in case keeping it or clearing token
    return Promise.resolve();
  },
};
