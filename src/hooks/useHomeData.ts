'use client';

import { useQuery } from '@tanstack/react-query';
import { getContentService } from '@/services/adapters/contentService';
import { getLiveService } from '@/services/adapters/liveService';

export function useHomeData() {
  const contentService = getContentService();
  const liveService = getLiveService();

  const homeQuery = useQuery({
    queryKey: ['home-data'],
    queryFn: () => contentService.getHomeData(),
  });

  const liveQuery = useQuery({
    queryKey: ['home-live'],
    queryFn: () => liveService.getLiveList({ page: 1, pageSize: 6 }),
  });

  return {
    homeData: homeQuery.data,
    livePrograms: liveQuery.data?.items ?? [],
    isLoading: homeQuery.isLoading || liveQuery.isLoading,
    isError: homeQuery.isError || liveQuery.isError,
    refetch: () => { homeQuery.refetch(); liveQuery.refetch(); },
  };
}
