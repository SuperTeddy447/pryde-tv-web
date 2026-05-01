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

  // Category Gradients
  const getCategoryGradient = (cat: string) => {
    if (cat === 'muaythai') return 'from-[#FACC15] to-[#94790C]';
    if (cat === 'football') return 'from-[#4ADE80] to-[#287845]';
    if (cat === 'volleyball') return 'from-[#0EA5E9] to-[#085D83]';
    return 'from-[#FACC15] to-[#94790C]';
  };
  const catLabel = item.category === 'muaythai' ? 'กีฬามวยไทย' : item.category === 'boxing' ? 'กีฬามวยสากล' : item.category === 'football' ? 'กีฬาฟุตบอล' : item.category === 'volleyball' ? 'กีฬาวอลเลย์บอล' : item.category;

  return (
    <Link href={href} className={cn('group block', className)}>
      <div className="rounded-xl overflow-hidden bg-transparent transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-gray-100 shadow-sm">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Top Left Badges */}
          <div className="absolute top-0 left-0 flex items-start">
            <div className={`bg-gradient-to-r ${getCategoryGradient(item.category)} text-white text-xs font-bold px-4 md:px-5 py-2 md:py-3 rounded-br-3xl shadow-md z-10`}>
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
        <div className="pt-4 px-1">
          <h3 className="font-bold text-base md:text-lg text-black line-clamp-2 group-hover:text-primary transition-colors">
            {locale === 'en' && item.titleEn ? item.titleEn : item.title}
          </h3>
          <p className="text-black/70 text-sm mt-1">
            {item.venue ? `ห้อง 1234 • ${item.venue} • ` : ''}{formatDate(item.dateTime, locale)}
          </p>
        </div>
      </div>
    </Link>
  );
}
