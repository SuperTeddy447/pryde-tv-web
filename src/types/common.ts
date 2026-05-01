export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface FilterParams {
  category?: string;
  search?: string;
  sort?: 'latest' | 'oldest' | 'popular';
}

export type Locale = 'th' | 'en';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
