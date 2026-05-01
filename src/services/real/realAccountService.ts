import { apiClient } from '../apiClient';
import type { UserProfile, CoinTransaction, CoinTopupPayload, RedeemCodePayload, TvQrCode } from '@/types/account';
import type { PaginatedResponse, PaginationParams } from '@/types/common';
import type { User } from '@/types/user';

export const realAccountService = {
  async getProfile(): Promise<UserProfile> {
    const { data } = await apiClient.get('/account/profile');
    return data;
  },

  async updateProfile(payload: Partial<User>): Promise<User> {
    const { data } = await apiClient.patch('/account/profile', payload);
    return data;
  },

  async getCoinBalance(): Promise<{ balance: number; points: number }> {
    const { data } = await apiClient.get('/account/balance');
    return data;
  },

  async getCoinHistory(params?: PaginationParams): Promise<PaginatedResponse<CoinTransaction>> {
    const { data } = await apiClient.get('/account/transactions', { params });
    return data;
  },

  async topupCoin(payload: CoinTopupPayload): Promise<{ success: boolean; newBalance: number }> {
    const { data } = await apiClient.post('/account/topup', payload);
    return data;
  },

  async redeemCode(payload: RedeemCodePayload): Promise<{ success: boolean; amount: number; newBalance: number }> {
    const { data } = await apiClient.post('/account/redeem', payload);
    return data;
  },

  async getTvQrCode(): Promise<TvQrCode> {
    const { data } = await apiClient.get('/account/tv-qr');
    return data;
  },
};
