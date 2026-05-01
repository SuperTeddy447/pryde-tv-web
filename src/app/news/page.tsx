'use client';
import { useQuery } from '@tanstack/react-query';
import { NewsCard } from '@/components/cards/NewsCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingCardGrid } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { contentService } from '@/services';
import { ROUTES } from '@/lib/constants';

export default function NewsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['news'], queryFn: () => contentService.getNews(),
  });

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer>
        <SectionHeader titleTh="📰 ข่าวกีฬา" titleEn="📰 Sports News" />
        {isLoading && <LoadingCardGrid count={6} />}
        {isError && <ErrorState onRetry={refetch} />}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.items.map((item) => (
              <NewsCard key={item.id} item={item} href={ROUTES.NEWS_DETAIL(item.id)} />
            ))}
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
