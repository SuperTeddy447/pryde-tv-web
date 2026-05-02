'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import type { Fighter } from '@/types/content';
import { ArrowRight } from 'lucide-react';

interface FighterCardDetailedProps {
  fighter: Fighter;
  href: string;
}

export function FighterCardDetailed({ fighter, href }: FighterCardDetailedProps) {
  const { locale, t } = useLanguage();

  return (
    <Link href={href} className="group block">
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-[#1E1E1E] to-black border border-white/5 shadow-lg group-hover:shadow-[#C2A437]/10 transition-all duration-300">
        
        {/* PRYDE Watermark / Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none select-none">
          <span className="text-[120px] font-black italic text-[#C2A437]/20 select-none">P</span>
        </div>

        {/* Fighter Image */}
        <div className="absolute inset-0 flex items-end justify-center pt-8">
          <Image 
            src={fighter.avatarUrl || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&h=700&fit=crop'} 
            alt={fighter.name} 
            width={500}
            height={700}
            className="h-full w-auto object-contain object-bottom group-hover:scale-105 transition-transform duration-500 z-10" 
          />
        </div>

        {/* Stats Overlay (Right Side) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          {/* Win Box */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16">
            <span className="text-lg md:text-xl font-bold text-white leading-none">{fighter.wins}</span>
            <span className="text-[10px] text-white/70 mt-1">ชนะ</span>
          </div>
          {/* Loss Box */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16">
            <span className="text-lg md:text-xl font-bold text-white leading-none">{fighter.losses}</span>
            <span className="text-[10px] text-white/70 mt-1">แพ้</span>
          </div>
          {/* Draw Box */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16">
            <span className="text-lg md:text-xl font-bold text-white leading-none">{fighter.draws}</span>
            <span className="text-[10px] text-white/70 mt-1">เสมอ</span>
          </div>
        </div>

        {/* Info Overlay (Bottom) */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          <div className="relative p-4 md:p-6 pb-2">
             <div className="flex items-center gap-2 mb-2">
                <span className="text-[14px] md:text-[18px] font-black text-white italic tracking-wider">PRYDE <span className="text-[10px] align-top">TV</span></span>
             </div>
            <h3 className="font-bold text-white text-lg md:text-xl leading-tight line-clamp-1">
              {locale === 'en' && fighter.nameEn ? fighter.nameEn : fighter.name}
            </h3>
            <p className="text-white/60 text-[10px] md:text-xs mt-1 line-clamp-1">
              {fighter.rank || 'แชมป์มวยไทยรุ่นไลท์เวท'}
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm py-2 px-4 md:px-6 flex items-center justify-between group-hover:bg-[#C2A437]/20 transition-colors">
            <span className="text-[10px] md:text-xs text-white font-medium uppercase tracking-wider">ดูอันดับอื่นๆ</span>
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-white group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
