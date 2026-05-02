'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { formatDateTime } from '@/lib/format';
import type { LiveItem } from '@/types/live';
import { ROUTES } from '@/lib/constants';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { useState, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface HeroLiveSectionProps {
  items: LiveItem[];
}

export function HeroLiveSection({ items }: HeroLiveSectionProps) {
  const { locale, t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!items || items.length === 0) return null;

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 5000 })]}
        className="w-full h-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {items.map((item, index) => {
            const heroImage = item.coverUrl ?? 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600&h=800&fit=crop';
            const title = locale === 'en' && item.titleEn ? item.titleEn : item.title;
            const subtitle = locale === 'en' && item.descriptionEn ? item.descriptionEn : item.description;

            return (
              <CarouselItem key={item.id} className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={heroImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pryde-black/90 via-pryde-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-pryde-black/30" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-[1440px] mx-auto px-2 md:px-4 lg:px-6 w-full">
                    <div className="max-w-2xl animate-fade-in-up">
                      {item.status === 'live' && (
                        <Badge className="bg-pryde-red text-white border-none mb-4 text-[14px] font-medium w-[105px] h-[32px] flex items-center justify-center gap-2 rounded-full shadow-lg">
                          <Image src="/live_logo.svg" alt="Live" width={50} height={14} className="h-3.5 w-auto object-contain brightness-0 invert" />
                          <span className="uppercase tracking-tight">NOW</span>
                        </Badge>
                      )}
                      {item.status === 'upcoming' && (
                        <Badge className="bg-gold text-black border-none mb-4 text-sm">
                          {t('เร็วๆ นี้', 'UPCOMING')}
                        </Badge>
                      )}

                      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
                        {title}
                      </h1>
                      <p className="text-white/70 text-base md:text-lg mb-2">{subtitle}</p>

                      <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
                        <span>📅 {formatDateTime(item.startTime, locale)}</span>
                        <span>📍 {item.venue}</span>
                        <span>🥊 {item.matchCount} {t('คู่', 'matches')}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href={ROUTES.LIVE_DETAIL(item.id)}>
                          <Button className="bg-[#C2A437] hover:bg-[#DFB943] text-black font-bold text-base h-12 px-8 rounded-xl flex items-center gap-2">
                            {item.status === 'live' ? (
                              <>
                                <Image src="/live_logo.svg" alt="Live" width={40} height={12} className="h-3 w-auto object-contain brightness-0" />
                                <span>{t('ดูถ่ายทอดสด', 'Watch Live')}</span>
                              </>
                            ) : (
                              t('ดูรายละเอียด', 'View Details')
                            )}
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
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Pagination dots (Vertical on right edge) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        {items.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-gold h-4' : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
