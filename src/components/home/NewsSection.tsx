'use client';

import { useRouter } from 'next/navigation';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { NewsCard } from '@/components/cards/NewsCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { ROUTES } from '@/lib/constants';
import type { NewsItem } from '@/types/content';

interface NewsSectionProps { items: NewsItem[]; }

export function NewsSection({ items }: NewsSectionProps) {
  const router = useRouter();
  return (
    <section className="py-12">
      <ResponsiveContainer>
        <SectionHeader titleTh="📰 ข่าวกีฬา" titleEn="📰 Sports News" onViewMore={() => router.push(ROUTES.NEWS)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} href={ROUTES.NEWS_DETAIL(item.id)} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
