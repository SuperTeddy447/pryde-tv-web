import type { ContentItem, NewsItem, Fighter, RankingItem, HomeData } from '@/types/content';
import type { PaginatedResponse, FilterParams, PaginationParams } from '@/types/common';
import { mockHighlights, mockReplays, mockNews, mockPrograms, mockResults, mockFighters, mockRankings } from './mockData';

const delay = () => {
  const ms = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
  return new Promise((res) => setTimeout(res, ms));
};

function paginate<T>(items: T[], params?: PaginationParams): PaginatedResponse<T> {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 12;
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize),
  };
}

function filterItems<T extends ContentItem>(items: T[], filters?: FilterParams): T[] {
  let filtered = [...items];
  if (filters?.category && filters.category !== 'all') {
    filtered = filtered.filter((i) => i.category === filters.category);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter((i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  }
  return filtered;
}

export const mockContentService = {
  async getHomeData(): Promise<HomeData> {
    await delay();
    if (Math.random() < 0.05) {
      throw new Error('Home data failed to load');
    }
    return {
      heroHighlights: mockHighlights.slice(0, 3),
      livePrograms: mockPrograms.filter((p) => p.isLive),
      highlights: mockHighlights,
      replays: mockReplays,
      results: mockResults,
      news: mockNews.slice(0, 5),
      fighters: mockFighters.slice(0, 10),
    };
  },

  async getHighlights(params?: PaginationParams, filters?: FilterParams): Promise<PaginatedResponse<ContentItem>> {
    await delay();
    return paginate(filterItems(mockHighlights, filters), params);
  },

  async getReplays(params?: PaginationParams, filters?: FilterParams): Promise<PaginatedResponse<ContentItem>> {
    await delay();
    return paginate(filterItems(mockReplays, filters), params);
  },

  async getNews(params?: PaginationParams, filters?: FilterParams): Promise<PaginatedResponse<NewsItem>> {
    await delay();
    const filtered = filters?.category && filters.category !== 'all'
      ? mockNews.filter((n) => n.category === filters.category)
      : mockNews;
    return paginate(filtered, params);
  },

  async getNewsDetail(id: string): Promise<NewsItem | null> {
    await delay();
    return mockNews.find((n) => n.id === id) ?? null;
  },

  async getPrograms(params?: PaginationParams, filters?: FilterParams): Promise<PaginatedResponse<ContentItem>> {
    await delay();
    return paginate(filterItems(mockPrograms, filters), params);
  },

  async getResults(params?: PaginationParams, filters?: FilterParams): Promise<PaginatedResponse<ContentItem>> {
    await delay();
    return paginate(filterItems(mockResults, filters), params);
  },

  async getFighters(params?: PaginationParams, filters?: FilterParams): Promise<PaginatedResponse<Fighter>> {
    await delay();
    let filtered = [...mockFighters];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter((f) => f.name.toLowerCase().includes(q) || (f.nameEn?.toLowerCase().includes(q)));
    }
    return paginate(filtered, params);
  },

  async getFighterDetail(id: string): Promise<Fighter | null> {
    await delay();
    return mockFighters.find((f) => f.id === id) ?? null;
  },

  async getRanking(params?: PaginationParams): Promise<PaginatedResponse<RankingItem>> {
    await delay();
    return paginate(mockRankings, params);
  },
};
