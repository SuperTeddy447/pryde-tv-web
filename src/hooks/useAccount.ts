'use client';
import { useQuery } from '@tanstack/react-query';
import { accountService } from '@/services';
import { useAuthStore } from '@/stores/authStore';

export function useAccount() {
  const { isAuthenticated } = useAuthStore();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => accountService.getProfile(),
    enabled: isAuthenticated,
  });

  const balanceQuery = useQuery({
    queryKey: ['coinBalance'],
    queryFn: () => accountService.getCoinBalance(),
    enabled: isAuthenticated,
  });

  const historyQuery = useQuery({
    queryKey: ['coinHistory'],
    queryFn: () => accountService.getCoinHistory(),
    enabled: isAuthenticated,
  });

  return {
    profile: profileQuery.data,
    coinBalance: balanceQuery.data?.balance ?? 0,
    prydePoints: balanceQuery.data?.points ?? 0,
    coinHistory: historyQuery.data?.items ?? [],
    isLoading: profileQuery.isLoading,
    refetchProfile: profileQuery.refetch,
    refetchBalance: balanceQuery.refetch,
    refetchHistory: historyQuery.refetch,
  };
}
