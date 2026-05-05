import type { LoginWithPhonePayload, RegisterPayload, ForgotPasswordPayload } from '@/types/auth';
import { mockUser } from './mockData';

const delay = () => {
  const ms = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
  return new Promise((res) => setTimeout(res, ms));
};

export const mockAuthService = {
  async loginWithPhone(payload: LoginWithPhonePayload): Promise<any> {
    await delay();
    if (payload.member_phone === '0000000000') {
      throw { message: 'username or password invalid' };
    }
    return {
      message: 'userLoginV2',
      accessToken: 'mock_token_' + Date.now(),
      MemberID: '12345',
      data: {
        member_id: '12345',
        member_fname: 'Mock User',
        member_avatar: '',
        member_phone: payload.member_phone,
        member_coin: 500,
        member_point: 100,
      },
      token: 'mock_token_' + Date.now(),
      refreshToken: 'mock_refresh_' + Date.now(),
      user: { ...mockUser, phone: payload.member_phone },
    };
  },

  async loginWithLine(payload?: any): Promise<any> {
    await delay();
    return {
      message: 'เข้าสู่ระบบสำเร็จ',
      accessToken: 'mock_line_token_' + Date.now(),
      MemberID: '12345',
      data: {
        member_id: '12345',
        member_fname: payload?.member_fname || 'LINE User',
        member_avatar: payload?.member_avatar || '',
      },
      token: 'mock_line_token_' + Date.now(),
      refreshToken: 'mock_line_refresh_' + Date.now(),
      user: { ...mockUser, name: 'LINE User' },
    };
  },

  async loginWithApple(payload?: any): Promise<any> {
    await delay();
    return {
      message: 'เข้าสู่ระบบสำเร็จ',
      accessToken: 'mock_apple_token_' + Date.now(),
      MemberID: '12345',
      data: {
        member_id: '12345',
        member_fname: 'Apple User',
        member_avatar: '',
      },
      token: 'mock_apple_token_' + Date.now(),
      refreshToken: 'mock_apple_refresh_' + Date.now(),
      user: { ...mockUser, name: 'Apple User' },
    };
  },

  async register(payload: RegisterPayload): Promise<any> {
    await delay();
    return { status: 'success', message: 'register success' };
  },

  async forgotPassword(_payload: ForgotPasswordPayload): Promise<any> {
    await delay();
    return { success: true, message: 'OTP sent to your phone' };
  },

  async sendOTP(_payload: { phone: string }): Promise<any> {
    await delay();
    return { success: true, message: 'OTP sent' };
  },

  async verifyOTP(_payload: { phone: string; otp: string }): Promise<any> {
    await delay();
    return { success: true, message: 'OTP verified' };
  },

  async logout(): Promise<void> {
    await delay();
  },
};
