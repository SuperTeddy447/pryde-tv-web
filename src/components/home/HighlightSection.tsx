'use client';

import { useRouter } from 'next/navigation';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ContentCard } from '@/components/cards/ContentCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { ROUTES } from '@/lib/constants';
import type { ContentItem } from '@/types/content';

interface HighlightSectionProps { items: ContentItem[]; }
interface ReplaySectionProps { items: ContentItem[]; }

export function HighlightSection({ items }: HighlightSectionProps) {
  const router = useRouter();
  return (
    <section className="py-12">
      <ResponsiveContainer>
        <SectionHeader titleTh="🏆 ไฮไลท์" titleEn="🏆 Highlights" onViewMore={() => router.push(ROUTES.HIGHLIGHTS)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} href={`${ROUTES.HIGHLIGHTS}#${item.id}`} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}

export function ReplaySection({ items }: ReplaySectionProps) {
  const router = useRouter();
  return (
    <section className="py-12 bg-pryde-dark-gray/50">
      <ResponsiveContainer>
        <SectionHeader titleTh="📺 ย้อนหลัง" titleEn="📺 Replays" onViewMore={() => router.push(ROUTES.REPLAYS)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} href={`${ROUTES.REPLAYS}#${item.id}`} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
