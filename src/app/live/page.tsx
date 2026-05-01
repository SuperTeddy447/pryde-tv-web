'use client';

import { useLiveList } from '@/hooks/useLiveList';
import { LiveCard } from '@/components/cards/LiveCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingCardGrid } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ROUTES } from '@/lib/constants';

export default function LivePage() {
  const { data, isLoading, isError, refetch } = useLiveList();

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer>
        <SectionHeader titleTh="🔴 รายการถ่ายทอดสด" titleEn="🔴 Live Programs" />
        {isLoading && <LoadingCardGrid count={6} />}
        {isError && <ErrorState onRetry={refetch} />}
        {data && data.items.length === 0 && <EmptyState messageTh="ไม่มีรายการถ่ายทอดสด" messageEn="No live programs available" icon="📺" />}
        {data && data.items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.items.map((item) => (
              <LiveCard key={item.id} item={item} href={ROUTES.LIVE_DETAIL(item.id)} />
            ))}
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
