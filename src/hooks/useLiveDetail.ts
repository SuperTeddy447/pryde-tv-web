'use client';
import { useQuery } from '@tanstack/react-query';
import { liveService } from '@/services';

export function useLiveDetail(id: string) {
  return useQuery({
    queryKey: ['liveDetail', id],
    queryFn: () => liveService.getLiveDetail(id),
    enabled: !!id,
  });
}
