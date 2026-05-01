'use client';

import { useQuery } from '@tanstack/react-query';
import { contentService, liveService } from '@/services';

export function useHomeData() {
  const homeQuery = useQuery({
    queryKey: ['homeData'],
    queryFn: () => contentService.getHomeData(),
  });

  const liveQuery = useQuery({
    queryKey: ['livePrograms'],
    queryFn: () => liveService.getLiveList({ pageSize: 6 }),
  });

  return {
    homeData: homeQuery.data,
    livePrograms: liveQuery.data?.items ?? [],
    isLoading: homeQuery.isLoading || liveQuery.isLoading,
    isError: homeQuery.isError || liveQuery.isError,
    refetch: () => { homeQuery.refetch(); liveQuery.refetch(); },
  };
}
