import { apiClient } from '../apiClient';
import type { ContentItem, NewsItem, HomeData, Fighter, RankingItem } from '@/types/content';
import type { PaginatedResponse, PaginationParams } from '@/types/common';

export const realContentService = {
  async getHomeData(): Promise<HomeData> {
    const { data } = await apiClient.get('/content/home');
    return data;
  },

  async getPrograms(params?: PaginationParams): Promise<PaginatedResponse<ContentItem>> {
    const { data } = await apiClient.get('/content/programs', { params });
    return data;
  },

  async getHighlights(params?: PaginationParams): Promise<PaginatedResponse<ContentItem>> {
    const { data } = await apiClient.get('/content/highlights', { params });
    return data;
  },

  async getReplays(params?: PaginationParams): Promise<PaginatedResponse<ContentItem>> {
    const { data } = await apiClient.get('/content/replays', { params });
    return data;
  },

  async getNews(params?: PaginationParams): Promise<PaginatedResponse<NewsItem>> {
    const { data } = await apiClient.get('/content/news', { params });
    return data;
  },

  async getNewsDetail(id: string): Promise<NewsItem> {
    const { data } = await apiClient.get(`/content/news/${id}`);
    return data;
  },

  async getFighters(params?: PaginationParams): Promise<PaginatedResponse<Fighter>> {
    const { data } = await apiClient.get('/content/fighters', { params });
    return data;
  },

  async getFighterDetail(id: string): Promise<Fighter> {
    const { data } = await apiClient.get(`/content/fighters/${id}`);
    return data;
  },

  async getRanking(): Promise<PaginatedResponse<RankingItem>> {
    const { data } = await apiClient.get('/content/ranking');
    return data;
  },
};
