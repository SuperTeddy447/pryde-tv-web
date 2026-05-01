'use client';
import { useQuery } from '@tanstack/react-query';
import { getContentService } from '@/services/adapters/contentService';
import { ContentCard } from '@/components/cards/ContentCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingCardGrid } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { SectionHeader } from '@/components/shared/SectionHeader';

export default function ReplaysPage() {
  const service = getContentService();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['replays'], queryFn: () => service.getReplays(),
  });

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer>
        <SectionHeader titleTh="📺 ย้อนหลัง" titleEn="📺 Replays" />
        {isLoading && <LoadingCardGrid count={8} />}
        {isError && <ErrorState onRetry={refetch} />}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.items.map((item) => (
              <ContentCard key={item.id} item={item} href={`/replays#${item.id}`} />
            ))}
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
