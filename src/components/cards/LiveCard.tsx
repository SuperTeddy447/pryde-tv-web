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
    live: { label: t('กำลังถ่ายทอดสด', 'LIVE NOW'), bg: 'bg-pryde-red', pulse: true },
    upcoming: { label: t('เร็วๆ นี้', 'UPCOMING'), bg: 'bg-gold', pulse: false },
    ended: { label: t('จบแล้ว', 'ENDED'), bg: 'bg-muted', pulse: false },
  };
  const status = statusConfig[item.status];

  return (
    <Link href={href} className="group block">
      <div className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <Badge className={`absolute top-3 left-3 ${status.bg} text-white border-none text-xs font-semibold ${status.pulse ? 'live-badge' : ''}`}>
            {status.label}
          </Badge>
          <Badge className="absolute top-3 right-3 bg-gold text-black border-none text-xs font-semibold">
            🪙 {item.priceCoin}
          </Badge>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white font-bold text-sm md:text-base line-clamp-1">
              {locale === 'en' && item.titleEn ? item.titleEn : item.title}
            </p>
            <p className="text-white/70 text-xs mt-1">
              {formatDateTime(item.startTime, locale)} • {item.venue}
            </p>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {item.matchCount} {t('คู่', 'matches')}
          </span>
          <span className="text-xs font-medium text-gold group-hover:text-gold-light transition-colors">
            {t('ดูรายละเอียด →', 'View Details →')}
          </span>
        </div>
      </div>
    </Link>
  );
}
