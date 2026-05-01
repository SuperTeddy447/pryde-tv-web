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

  // Category Colors
  const getCategoryColor = (cat: string) => {
    if (cat === 'muaythai') return 'bg-[#C2A437]';
    if (cat === 'football') return 'bg-[#38A169]';
    if (cat === 'volleyball') return 'bg-[#3182CE]';
    return 'bg-[#C2A437]';
  };
  const catLabel = item.category === 'muaythai' ? 'กีฬามวยไทย' : item.category === 'boxing' ? 'กีฬามวยสากล' : item.category === 'football' ? 'กีฬาฟุตบอล' : item.category === 'volleyball' ? 'กีฬาวอลเลย์บอล' : item.category;

  return (
    <Link href={href} className={cn('group block', className)}>
      <div className="rounded-xl overflow-hidden bg-transparent transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Top Left Badges */}
          <div className="absolute top-3 left-3 flex items-center shadow-md rounded-r-full rounded-l-md overflow-hidden">
            <div className={`${getCategoryColor(item.category)} text-white text-[10px] font-bold px-3 py-1 rounded-r-full`}>
              {catLabel}
            </div>
          </div>

          {item.duration && (
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
              {item.duration}
            </span>
          )}
        </div>
        
        {/* Text Below Image */}
        <div className="pt-3">
          <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {locale === 'en' && item.titleEn ? item.titleEn : item.title}
          </h3>
          <p className="text-muted-foreground text-xs mt-1">
            {item.venue ? `ห้อง 1234 • ${item.venue} • ` : ''}{formatDate(item.dateTime, locale)}
          </p>
        </div>
      </div>
    </Link>
  );
}
