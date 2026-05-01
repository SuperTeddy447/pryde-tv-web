'use client';
import { useQuery } from '@tanstack/react-query';
import { liveService } from '@/services';

export function useLiveList() {
  return useQuery({
    queryKey: ['liveList'],
    queryFn: () => liveService.getLiveList(),
  });
}
