import { apiClient } from '../apiClient';
import type { LiveItem, PurchaseLivePayload, ReportProblemPayload, SendTipPayload } from '@/types/live';
import type { PaginatedResponse, PaginationParams } from '@/types/common';

export const realLiveService = {
  async getLiveList(params?: PaginationParams): Promise<PaginatedResponse<LiveItem>> {
    const { data } = await apiClient.get('/live', { params });
    return data;
  },

  async getLiveDetail(id: string): Promise<LiveItem | null> {
    const { data } = await apiClient.get(`/live/${id}`);
    return data;
  },

  async purchaseLive(payload: PurchaseLivePayload): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.post('/live/purchase', payload);
    return data;
  },

  async sendTip(payload: SendTipPayload): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.post('/live/tip', payload);
    return data;
  },

  async reportProblem(payload: ReportProblemPayload): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.post('/live/report', payload);
    return data;
  },
};
