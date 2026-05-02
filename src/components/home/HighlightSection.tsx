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
    <section className="py-12 bg-[#F9FAFB] text-black">
      <ResponsiveContainer>
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-[48px] font-medium text-[#4A4A4A]">
            ไฮไลท์กีฬามันส์ ๆ
          </h2>
          <button
            onClick={() => router.push(ROUTES.HIGHLIGHTS)}
            className="text-sm text-black font-medium hover:text-[#C2A437] transition-colors"
          >
            ดูเพิ่มเติม <span className="ml-1">&gt;</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    <section className="py-12 bg-white text-black">
      <ResponsiveContainer>
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-[48px] font-medium text-[#4A4A4A]">
            เต็มแมทช์<span className="text-[#C2A437]">ย้อนหลัง</span>
          </h2>
          <button
            onClick={() => router.push(ROUTES.REPLAYS)}
            className="text-sm text-black font-medium hover:text-[#C2A437] transition-colors"
          >
            ดูเพิ่มเติม <span className="ml-1">&gt;</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} href={`${ROUTES.REPLAYS}#${item.id}`} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
