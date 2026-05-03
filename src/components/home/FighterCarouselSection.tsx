'use client';

import { useRouter } from 'next/navigation';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FighterCard } from '@/components/cards/FighterCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { ROUTES } from '@/lib/constants';
import type { Fighter } from '@/types/content';

interface FighterCarouselSectionProps { fighters: Fighter[]; }

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export function FighterCarouselSection({ fighters }: FighterCarouselSectionProps) {
  const router = useRouter();
  return (
    <section className="py-16 bg-[#171717] text-white">
      <ResponsiveContainer>
        <div className="flex items-center justify-between mb-10 relative">
          <div className="flex-1 flex justify-center items-center">
            <h2 className="text-3xl md:text-[48px] font-medium text-white">
              <span className="italic">ประวัติ</span><span className="text-[#C2A437]">นักกีฬา</span>
            </h2>
          </div>
          <button
            onClick={() => router.push(ROUTES.FIGHTERS)}
            className="text-sm text-white/70 font-medium hover:text-[#C2A437] transition-colors absolute right-0"
          >
            ดูเพิ่มเติม <span className="ml-1">&gt;</span>
          </button>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {fighters.map((fighter) => (
              <CarouselItem key={fighter.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <FighterCard fighter={fighter} href={ROUTES.FIGHTER_DETAIL(fighter.id)} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/3 -translate-y-1/2 border-white/20 bg-transparent text-white hover:bg-white/10" />
            <CarouselNext className="absolute -right-12 top-1/3 -translate-y-1/2 border-white/20 bg-transparent text-white hover:bg-white/10" />
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-2 h-2 rounded-full bg-[#C2A437]" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </Carousel>
      </ResponsiveContainer>
    </section>
  );
}
