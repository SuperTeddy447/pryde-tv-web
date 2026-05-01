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
    <section className="py-12 relative bg-white dark:bg-white text-black">
      {/* Background gradient fade from dark hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0E0E0E] to-transparent pointer-events-none" />
      
      <ResponsiveContainer className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          {/* Centered title */}
          <div className="flex-1 flex justify-center items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#4A4A4A]">
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
            className="text-sm text-black font-medium flex items-center hover:text-[#C2A437] transition-colors absolute right-4 md:right-8"
          >
            ดูเพิ่มเติม <span className="ml-1">&gt;</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <LiveCard key={item.id} item={item} href={ROUTES.LIVE_DETAIL(item.id)} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  );
}
