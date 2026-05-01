'use client';

import { useRouter } from 'next/navigation';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FighterCard } from '@/components/cards/FighterCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { ROUTES } from '@/lib/constants';
import type { Fighter } from '@/types/content';

interface FighterCarouselSectionProps { fighters: Fighter[]; }

export function FighterCarouselSection({ fighters }: FighterCarouselSectionProps) {
  const router = useRouter();
  return (
    <section className="py-12 bg-pryde-dark-gray/50">
      <ResponsiveContainer>
        <SectionHeader titleTh="🥊 นักกีฬา" titleEn="🥊 Fighters" onViewMore={() => router.push(ROUTES.FIGHTERS)} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {fighters.map((fighter) => (
            <FighterCard key={fighter.id} fighter={fighter} href={ROUTES.FIGHTER_DETAIL(fighter.id)} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
