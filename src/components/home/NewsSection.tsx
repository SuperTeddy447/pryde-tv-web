'use client';

import { useRouter } from 'next/navigation';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { ROUTES } from '@/lib/constants';
import type { NewsItem } from '@/types/content';

interface NewsSectionProps { items: NewsItem[]; }

export function NewsSection({ items }: NewsSectionProps) {
  const router = useRouter();
  return (
    <section className="py-12 bg-[#F9FAFB] text-black">
      <ResponsiveContainer>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold italic text-[#4A4A4A]">
            ข่าว<span className="text-[#C2A437]">กีฬา</span>
          </h2>
          <button
            onClick={() => router.push(ROUTES.NEWS)}
            className="text-sm text-black font-medium hover:text-[#C2A437] transition-colors"
          >
            ดูเพิ่มเติม <span className="ml-1">&gt;</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} href={ROUTES.NEWS_DETAIL(item.id)} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
