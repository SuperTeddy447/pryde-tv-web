import { apiClient } from '../apiClient';
import type { UserProfile, CoinTransaction, CoinTopupPayload, RedeemCodePayload, TvQrCode } from '@/types/account';
import type { PaginatedResponse, PaginationParams } from '@/types/common';
import type { User } from '@/types/user';

export const realAccountService = {
  async getProfile(): Promise<any> {
    const member_id = typeof window !== 'undefined' ? localStorage.getItem('member_id') : '';
    const { data } = await apiClient.get('/auth/member/profile', { params: { member_id } });
    return data;
  },

  async updateProfile(payload: Partial<User>): Promise<any> {
    const member_id = typeof window !== 'undefined' ? localStorage.getItem('member_id') : '';
    const { data } = await apiClient.put(`/auth/member/profile/update/${member_id}`, payload);
    return data;
  },

  async getCoinBalance(): Promise<any> {
    const member_id = typeof window !== 'undefined' ? localStorage.getItem('member_id') : '';
    const { data } = await apiClient.get('/auth/member/wallet', { params: { member_id } });
    return data;
  },

  async getCoinHistory(params?: PaginationParams): Promise<PaginatedResponse<CoinTransaction>> {
    const { data } = await apiClient.get('/account/transactions', { params }); // Adjust if there's a legacy endpoint
    return data;
  },

  async topupCoin(payload: CoinTopupPayload): Promise<{ success: boolean; newBalance: number }> {
    const { data } = await apiClient.post('/account/topup', payload); // Adjust if there's a legacy endpoint
    return data;
  },

  async redeemCode(payload: RedeemCodePayload): Promise<any> {
    const { data } = await apiClient.post('redeem/useRedeem', payload);
    return data;
  },

  async getTvQrCode(): Promise<TvQrCode> {
    const { data } = await apiClient.get('/account/tv-qr');
    return data;
  },
};
