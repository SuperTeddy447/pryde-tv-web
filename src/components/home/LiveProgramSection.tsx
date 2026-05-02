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

  // Show only 1 row (up to 3 items)
  const displayItems = items.slice(0, 3);

  return (
    <section className="relative z-20">
      {/* 
        To create the overlap effect:
        - We use a negative margin-top to pull this section up over the hero.
        - The inner container has a white background, rounded corners, and shadow.
        - We also include a background element below the card to blend with the next section.
      */}
      <div className="absolute top-32 inset-x-0 bottom-0 bg-[#F9FAFB] -z-10" />
      
      <ResponsiveContainer className="-mt-32 relative">
        <div className="bg-gradient-to-b from-white via-white to-transparent rounded-t-3xl pt-6 px-6 pb-2 md:pt-8 md:px-8 md:pb-4 lg:pt-10 lg:px-10 lg:pb-6">
          <div className="flex items-center justify-between mb-8 relative">
            {/* Centered title */}
            <div className="flex-1 flex justify-center items-center gap-3">
              <h2 className="text-3xl md:text-[48px] font-medium text-[#4A4A4A]">
                โปรแกรม<span className="text-[#C2A437]">ถ่ายทอดสด</span>
              </h2>
              <div className="bg-[#E53E3E] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                ถ่ายทอดสด
              </div>
            </div>
            {/* View More */}
            <button
              onClick={() => router.push(ROUTES.LIVE)}
              className="text-sm text-black font-medium flex items-center hover:text-[#C2A437] transition-colors absolute right-0"
            >
              ดูเพิ่มเติม <span className="ml-1">&gt;</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item) => (
              <LiveCard key={item.id} item={item} href={ROUTES.LIVE_DETAIL(item.id)} />
            ))}
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
}
