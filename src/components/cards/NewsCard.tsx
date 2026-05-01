'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { getRelativeTime } from '@/lib/format';
import type { NewsItem } from '@/types/content';

interface NewsCardProps {
  item: NewsItem;
  href: string;
}

export function NewsCard({ item, href }: NewsCardProps) {
  const { locale } = useLanguage();

  return (
    <Link href={href} className="group block">
      <div className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 flex flex-col sm:flex-row">
        <div className="relative aspect-video sm:aspect-square sm:w-40 flex-shrink-0 overflow-hidden">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 160px"
          />
        </div>
        <div className="p-4 flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-gold transition-colors">
            {locale === 'en' && item.titleEn ? item.titleEn : item.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {locale === 'en' && item.descriptionEn ? item.descriptionEn : item.description}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-muted-foreground">{getRelativeTime(item.dateTime, locale)}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-gold">{item.author}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
