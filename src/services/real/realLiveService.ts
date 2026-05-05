import { apiClient } from '../apiClient';
import type { LiveItem, PurchaseLivePayload, ReportProblemPayload, SendTipPayload } from '@/types/live';
import type { PaginatedResponse, PaginationParams } from '@/types/common';

export const realLiveService = {
  async getLiveList(params?: PaginationParams): Promise<PaginatedResponse<LiveItem>> {
    const { data } = await apiClient.get('match/all', { params });
    return data;
  },

  async getLiveDetail(id: string): Promise<LiveItem | null> {
    const member_id = typeof window !== 'undefined' ? localStorage.getItem('member_id') || '' : '';
    const { data } = await apiClient.get(`match/find/${id}?webapp=true&member_id=${member_id}`);
    return data;
  },

  async joinStream(payload: { member_id: string; watch_token: string }): Promise<any> {
    const { data } = await apiClient.post('/memberWatchStream/joinWatchStream', payload);
    return data;
  },

  async leaveStream(payload: { member_id: string; watch_token: string }): Promise<any> {
    const { data } = await apiClient.put('/memberWatchStream/leaveWatchStream', payload);
    return data;
  },

  async getViewCount(key: string): Promise<any> {
    const { data } = await apiClient.get(`/redist/countViewer?key=${key}`);
    return data;
  },

  async purchaseLive(payload: PurchaseLivePayload): Promise<{ success: boolean; message: string }> {
    // Note: Assuming there's a purchase endpoint, adapting from the context if any, 
    // but the old app checked if token was 'Purchase' for external/member/purchase
    const { data } = await apiClient.post('external/member/purchase', payload);
    return data;
  },

  async sendTip(payload: SendTipPayload): Promise<{ success: boolean; message: string }> {
    // Assuming matching legacy tip sending logic
    const { data } = await apiClient.post('/giftLog/create', payload);
    return data;
  },

  async reportProblem(payload: ReportProblemPayload): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.post('/live/report', payload);
    return data;
  },
};
