'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { formatDate } from '@/lib/format';
import type { ContentItem } from '@/types/content';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  item: ContentItem;
  href: string;
  className?: string;
}

export function ContentCard({ item, href, className }: ContentCardProps) {
  const { locale, t } = useLanguage();

  return (
    <Link href={href} className={cn('group block', className)}>
      <div className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {item.isLive && (
            <Badge className="absolute top-3 left-3 bg-pryde-red text-white border-none live-badge text-xs font-semibold">
              LIVE
            </Badge>
          )}
          {item.coinPrice > 0 && (
            <Badge className="absolute top-3 right-3 bg-gold text-black border-none text-xs font-semibold">
              🪙 {item.coinPrice}
            </Badge>
          )}
          {item.duration && (
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
              {item.duration}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2 group-hover:text-gold transition-colors">
            {locale === 'en' && item.titleEn ? item.titleEn : item.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">
              {formatDate(item.dateTime, locale)}
            </span>
            {item.venue && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{item.venue}</span>
              </>
            )}
          </div>
          {item.category && (
            <Badge variant="outline" className="mt-2 text-xs border-gold/30 text-gold">
              {t(
                item.category === 'muaythai' ? 'มวยไทย' : item.category === 'boxing' ? 'มวยสากล' : item.category,
                item.category
              )}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
