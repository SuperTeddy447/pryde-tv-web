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

  // Category Colors
  const getCategoryColor = (cat: string) => {
    if (cat === 'muaythai') return 'bg-[#C2A437]';
    if (cat === 'football') return 'bg-[#38A169]';
    if (cat === 'volleyball') return 'bg-[#3182CE]';
    return 'bg-[#C2A437]';
  };
  const catLabel = item.category === 'muaythai' ? 'กีฬามวยไทย' : item.category === 'boxing' ? 'กีฬามวยสากล' : item.category;

  return (
    <Link href={href} className="group block">
      <div className="rounded-xl overflow-hidden bg-transparent transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Top Left Badges */}
          <div className="absolute top-3 left-3 flex items-center shadow-md rounded-full overflow-hidden">
            <div className={`${getCategoryColor(item.category)} text-white text-[10px] font-bold px-3 py-1`}>
              {catLabel}
            </div>
            <div className={`${status.bg} text-white text-[10px] font-bold px-3 py-1 flex items-center gap-1`}>
              {item.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              {status.label}
            </div>
          </div>

          {/* Top Right Badges */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white text-xs">
              ★
            </div>
            <div className="bg-black/60 rounded-full px-2 py-1 flex items-center gap-1 text-[10px] font-bold text-gold">
              <span className="w-3 h-3 rounded-full bg-gold text-black flex items-center justify-center text-[8px]">P</span>
              {item.priceCoin.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Text Below Image */}
        <div className="pt-3">
          <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {locale === 'en' && item.titleEn ? item.titleEn : item.title}
          </h3>
          <p className="text-muted-foreground text-xs mt-1">
            {formatDateTime(item.startTime, locale)} • {item.venue}
          </p>
        </div>
      </div>
    </Link>
  );
}
