'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { formatDateTime } from '@/lib/format';
import type { LiveItem } from '@/types/live';

interface LiveCardProps {
  item: LiveItem;
  href: string;
}

export function LiveCard({ item, href }: LiveCardProps) {
  const { locale, t } = useLanguage();
  const statusConfig = {
    live: { label: 'Live', bg: 'bg-pryde-red' },
    upcoming: { label: 'Upcoming', bg: 'bg-gold' },
    ended: { label: 'Ended', bg: 'bg-muted' },
  };
  const status = statusConfig[item.status];

  // Category Gradients
  const getCategoryGradient = (cat: string) => {
    if (cat === 'muaythai') return 'from-[#FACC15] to-[#94790C]';
    if (cat === 'football') return 'from-[#4ADE80] to-[#287845]';
    if (cat === 'volleyball') return 'from-[#0EA5E9] to-[#085D83]';
    return 'from-[#FACC15] to-[#94790C]';
  };
  const catLabel = item.category === 'muaythai' ? 'กีฬามวยไทย' : item.category === 'boxing' ? 'กีฬามวยสากล' : item.category;

  return (
    <Link href={href} className="group block">
      <div className="rounded-xl overflow-hidden bg-transparent transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-gray-100 shadow-sm">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Top Left Badges */}
          <div className="absolute top-0 left-0 flex items-start">
            <div className={`bg-gradient-to-r ${getCategoryGradient(item.category)} text-white text-xs font-bold px-4 md:px-5 py-2 md:py-3 rounded-br-3xl shadow-md z-10`}>
              {catLabel}
            </div>
            <div className={`mt-2 md:mt-3 ml-2 ${status.bg} text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-10`}>
              {item.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              {status.label}
            </div>
          </div>

          {/* Top Right Badges */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <div className="w-7 h-7 rounded-full bg-black/80 flex items-center justify-center text-white text-xs border border-white/20">
              ★
            </div>
            <div className="bg-black/80 border border-white/20 rounded-full px-2 py-1 flex items-center gap-1.5 text-xs font-bold text-gold">
              <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#FACC15] to-[#94790C] text-black flex items-center justify-center text-[8px]">P</span>
              {item.priceCoin.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Text Below Image */}
        <div className="pt-4 px-1">
          <h3 className="font-bold text-base md:text-lg text-black line-clamp-1 group-hover:text-primary transition-colors">
            {locale === 'en' && item.titleEn ? item.titleEn : item.title}
          </h3>
          <p className="text-black/70 text-sm mt-1">
            {formatDateTime(item.startTime, locale)} • {item.venue}
          </p>
        </div>
      </div>
    </Link>
  );
}
