'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { formatRecord } from '@/lib/format';
import type { Fighter } from '@/types/content';

interface FighterCardProps {
  fighter: Fighter;
  href: string;
}

export function FighterCard({ fighter, href }: FighterCardProps) {
  const { locale, t } = useLanguage();

  return (
    <Link href={href} className="group block">
      <div className="flex flex-col items-center group-hover:-translate-y-1 transition-transform duration-300">
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-gradient-to-b from-[#1A1A1A] to-black border border-white/5">
          <Image 
            // Mocking portrait image by using avatarUrl or generic portrait URL
            src={fighter.avatarUrl || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=600&fit=crop'} 
            alt={fighter.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" 
          />
          {/* PRYDE logo watermark inside the card can be added if needed */}
        </div>
        
        <h3 className="font-bold text-white text-base md:text-lg mb-2 group-hover:text-[#C2A437] transition-colors text-center line-clamp-1">
          {locale === 'en' && fighter.nameEn ? fighter.nameEn : fighter.name}
        </h3>
        
        <div className="border border-white/20 rounded-full px-3 py-1">
          <span className="text-[10px] text-white/60">
            นักกีฬามวยไทย
          </span>
        </div>
      </div>
    </Link>
  );
}
