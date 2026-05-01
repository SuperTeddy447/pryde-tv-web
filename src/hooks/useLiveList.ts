'use client';
import { useQuery } from '@tanstack/react-query';
import { getLiveService } from '@/services/adapters/liveService';

export function useLiveList() {
  const service = getLiveService();
  return useQuery({ queryKey: ['live-list'], queryFn: () => service.getLiveList() });
}
