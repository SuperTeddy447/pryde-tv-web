import type { User } from '@/types/user';
import type { CoinTransaction, TopupCoinPayload, RedeemCodePayload, UpdateProfilePayload, TvQrCode } from '@/types/account';
import type { PaginatedResponse, PaginationParams } from '@/types/common';
import { mockUser, mockCoinHistory } from './mockData';

const delay = (ms: number = 600) => new Promise((res) => setTimeout(res, ms));

export const mockAccountService = {
  async getProfile(): Promise<User> {
    await delay();
    return { ...mockUser };
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<User> {
    await delay();
    return { ...mockUser, ...payload };
  },

  async getCoinBalance(): Promise<{ balance: number; points: number }> {
    await delay(300);
    return { balance: mockUser.coinBalance, points: mockUser.prydePointBalance };
  },

  async getCoinHistory(params?: PaginationParams): Promise<PaginatedResponse<CoinTransaction>> {
    await delay();
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 10;
    return {
      items: mockCoinHistory.slice((page - 1) * pageSize, page * pageSize),
      total: mockCoinHistory.length,
      page, pageSize,
      totalPages: Math.ceil(mockCoinHistory.length / pageSize),
    };
  },

  async topupCoin(_payload: TopupCoinPayload): Promise<{ success: boolean; newBalance: number }> {
    await delay(1000);
    return { success: true, newBalance: mockUser.coinBalance + _payload.amount };
  },

  async redeemCode(_payload: RedeemCodePayload): Promise<{ success: boolean; amount: number; newBalance: number }> {
    await delay();
    return { success: true, amount: 50, newBalance: mockUser.coinBalance + 50 };
  },

  async getTvQrCode(): Promise<TvQrCode> {
    await delay();
    return {
      qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PRYDETV_QR_CODE_MOCK',
      code: 'PRYDE-TV-ABC123',
      expiresAt: new Date(Date.now() + 300000).toISOString(),
    };
  },
};
