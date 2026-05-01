'use client';
import { useQuery } from '@tanstack/react-query';
import { getAccountService } from '@/services/adapters/accountService';
import { useAuthStore } from '@/stores/authStore';

export function useAccount() {
  const { isAuthenticated } = useAuthStore();
  const service = getAccountService();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => service.getProfile(),
    enabled: isAuthenticated,
  });

  const balanceQuery = useQuery({
    queryKey: ['coin-balance'],
    queryFn: () => service.getCoinBalance(),
    enabled: isAuthenticated,
  });

  const historyQuery = useQuery({
    queryKey: ['coin-history'],
    queryFn: () => service.getCoinHistory(),
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
