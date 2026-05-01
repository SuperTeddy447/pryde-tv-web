'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { formatDateTime } from '@/lib/format';
import type { LiveItem } from '@/types/live';
import { ROUTES } from '@/lib/constants';

interface HeroLiveSectionProps {
  liveItem?: LiveItem;
}

export function HeroLiveSection({ liveItem }: HeroLiveSectionProps) {
  const { locale, t } = useLanguage();

  const heroImage = liveItem?.coverUrl ?? 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600&h=800&fit=crop';
  const title = liveItem
    ? (locale === 'en' && liveItem.titleEn ? liveItem.titleEn : liveItem.title)
    : t('ดูมวยไทยสดได้ที่นี่', 'Watch Live Muay Thai Here');
  const subtitle = liveItem
    ? (locale === 'en' && liveItem.descriptionEn ? liveItem.descriptionEn : liveItem.description)
    : t('แพลตฟอร์มถ่ายทอดสดมวยไทยระดับพรีเมียม', 'Premium Muay Thai Live Streaming Platform');

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pryde-black/90 via-pryde-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-pryde-black via-transparent to-pryde-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            {liveItem?.status === 'live' && (
              <Badge className="bg-pryde-red text-white border-none mb-4 text-sm live-badge animate-pulse-gold">
                🔴 LIVE NOW
              </Badge>
            )}
            {liveItem?.status === 'upcoming' && (
              <Badge className="bg-gold text-black border-none mb-4 text-sm">
                {t('เร็วๆ นี้', 'UPCOMING')}
              </Badge>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
              {title}
            </h1>
            <p className="text-white/70 text-base md:text-lg mb-2">{subtitle}</p>

            {liveItem && (
              <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
                <span>📅 {formatDateTime(liveItem.startTime, locale)}</span>
                <span>📍 {liveItem.venue}</span>
                <span>🥊 {liveItem.matchCount} {t('คู่', 'matches')}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={liveItem ? ROUTES.LIVE_DETAIL(liveItem.id) : ROUTES.LIVE}>
                <Button className="bg-gold hover:bg-gold-light text-black font-bold text-base h-12 px-8 rounded-xl">
                  {liveItem?.status === 'live'
                    ? t('ดูถ่ายทอดสด', 'Watch Live')
                    : t('ดูรายละเอียด', 'View Details')}
                </Button>
              </Link>
              <Link href={ROUTES.PROGRAMS}>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 rounded-xl">
                  {t('โปรแกรมการแข่งขัน', 'Programs')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
