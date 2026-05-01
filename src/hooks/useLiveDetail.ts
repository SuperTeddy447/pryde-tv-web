'use client';
import { useQuery } from '@tanstack/react-query';
import { getLiveService } from '@/services/adapters/liveService';

export function useLiveDetail(id: string) {
  const service = getLiveService();
  return useQuery({
    queryKey: ['live-detail', id],
    queryFn: () => service.getLiveDetail(id),
    enabled: !!id,
  });
}
