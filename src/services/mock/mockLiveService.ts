import type { LiveItem, PurchaseLivePayload, ReportProblemPayload, SendTipPayload } from '@/types/live';
import type { PaginatedResponse, PaginationParams } from '@/types/common';
import { mockLivePrograms } from './mockData';

const delay = (ms: number = 600) => new Promise((res) => setTimeout(res, ms));

export const mockLiveService = {
  async getLiveList(params?: PaginationParams): Promise<PaginatedResponse<LiveItem>> {
    await delay();
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 12;
    return {
      items: mockLivePrograms.slice((page - 1) * pageSize, page * pageSize),
      total: mockLivePrograms.length,
      page, pageSize,
      totalPages: Math.ceil(mockLivePrograms.length / pageSize),
    };
  },

  async getLiveDetail(id: string): Promise<LiveItem | null> {
    await delay();
    return mockLivePrograms.find((l) => l.id === id) ?? null;
  },

  async purchaseLive(_payload: PurchaseLivePayload): Promise<{ success: boolean; message: string }> {
    await delay(1000);
    return { success: true, message: 'Purchase successful' };
  },

  async reportProblem(_payload: ReportProblemPayload): Promise<{ success: boolean }> {
    await delay();
    return { success: true };
  },

  async sendTip(_payload: SendTipPayload): Promise<{ success: boolean; newBalance: number }> {
    await delay();
    return { success: true, newBalance: 1200 };
  },
};
