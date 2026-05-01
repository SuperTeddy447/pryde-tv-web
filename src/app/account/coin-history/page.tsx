'use client';
import { useAccount } from '@/hooks/useAccount';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuthStore } from '@/stores/authStore';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatDateTime, formatCoin } from '@/lib/format';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { CoinTransaction } from '@/types/account';

export default function CoinHistoryPage() {
  const { isAuthenticated } = useAuthStore();
  const { coinHistory, isLoading } = useAccount();
  const { t, locale } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer className="max-w-3xl">
        <SectionHeader titleTh="📋 ประวัติเหรียญ" titleEn="📋 Coin History" />
        
        {isLoading ? (
          <LoadingState />
        ) : coinHistory.length === 0 ? (
          <EmptyState messageTh="ไม่มีประวัติทำรายการ" messageEn="No transaction history" />
        ) : (
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <div className="divide-y divide-border/50">
              {coinHistory.map((tx: CoinTransaction) => (
                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <p className="font-medium text-white">{tx.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDateTime(tx.createdAt, locale)}
                    </p>
                  </div>
                  <div className={`font-bold ${tx.amount > 0 ? 'text-pryde-green' : 'text-white'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatCoin(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
