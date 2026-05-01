'use client';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { useLanguage } from '@/hooks/useLanguage';
import { formatDate } from '@/lib/format';
import { contentService } from '@/services';
import Image from 'next/image';

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { locale } = useLanguage();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['news-detail', id], queryFn: () => contentService.getNewsDetail(id),
  });

  if (isLoading) return <div className="pt-20"><LoadingState /></div>;
  if (isError || !data) return <div className="pt-20"><ErrorState onRetry={refetch} /></div>;

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer className="max-w-3xl">
        <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
          <Image src={data.thumbnailUrl} alt={data.title} fill className="object-cover" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {locale === 'en' && data.titleEn ? data.titleEn : data.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
          <span>{formatDate(data.dateTime, locale)}</span>
          <span>•</span>
          <span className="text-gold">{data.author}</span>
        </div>
        <div className="prose prose-invert max-w-none text-white/80 leading-relaxed">
          <p>{locale === 'en' && data.contentEn ? data.contentEn : data.content}</p>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
