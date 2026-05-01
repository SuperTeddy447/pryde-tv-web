'use client';

import { useRouter } from 'next/navigation';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { LiveCard } from '@/components/cards/LiveCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { ROUTES } from '@/lib/constants';
import type { LiveItem } from '@/types/live';

interface LiveProgramSectionProps {
  items: LiveItem[];
}

export function LiveProgramSection({ items }: LiveProgramSectionProps) {
  const router = useRouter();

  return (
    <section className="py-12">
      <ResponsiveContainer>
        <SectionHeader
          titleTh="🔴 รายการถ่ายทอดสด"
          titleEn="🔴 Live Programs"
          onViewMore={() => router.push(ROUTES.LIVE)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <LiveCard key={item.id} item={item} href={ROUTES.LIVE_DETAIL(item.id)} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
