'use client';
import { useQuery } from '@tanstack/react-query';
import { FighterCard } from '@/components/cards/FighterCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingCardGrid } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { contentService } from '@/services';
import { ROUTES } from '@/lib/constants';

export default function FightersPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['fighters'], queryFn: () => contentService.getFighters(),
  });

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer>
        <SectionHeader titleTh="🥊 นักกีฬา" titleEn="🥊 Fighters" />
        {isLoading && <LoadingCardGrid count={10} />}
        {isError && <ErrorState onRetry={refetch} />}
        {data && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data.items.map((fighter) => (
              <FighterCard key={fighter.id} fighter={fighter} href={ROUTES.FIGHTER_DETAIL(fighter.id)} />
            ))}
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
