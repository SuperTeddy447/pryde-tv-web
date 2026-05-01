'use client';
import { useQuery } from '@tanstack/react-query';
import { getContentService } from '@/services/adapters/contentService';
import { ContentCard } from '@/components/cards/ContentCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingCardGrid } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { SectionHeader } from '@/components/shared/SectionHeader';

export default function HighlightsPage() {
  const service = getContentService();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['highlights'], queryFn: () => service.getHighlights(),
  });

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer>
        <SectionHeader titleTh="🏆 ไฮไลท์" titleEn="🏆 Highlights" />
        {isLoading && <LoadingCardGrid count={8} />}
        {isError && <ErrorState onRetry={refetch} />}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.items.map((item) => (
              <ContentCard key={item.id} item={item} href={`/highlights#${item.id}`} />
            ))}
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
