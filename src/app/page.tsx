'use client';

import { useHomeData } from '@/hooks/useHomeData';
import { HeroLiveSection } from '@/components/home/HeroLiveSection';
import { LiveProgramSection } from '@/components/home/LiveProgramSection';
import { HighlightSection, ReplaySection } from '@/components/home/HighlightSection';
import { NewsSection } from '@/components/home/NewsSection';
import { FighterCarouselSection } from '@/components/home/FighterCarouselSection';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import type { NewsItem } from '@/types/content';

export default function HomePage() {
  const { homeData, livePrograms, isLoading, isError, refetch } = useHomeData();

  if (isLoading) return <div className="pt-16"><LoadingState /></div>;
  if (isError) return <div className="pt-16"><ErrorState onRetry={refetch} /></div>;

  const heroLives = livePrograms.slice(0, 4); // Show top 4 items in hero carousel

  return (
    <div>
      {heroLives.length > 0 && <HeroLiveSection items={heroLives} />}
      
      {/* 1. โปรแกรมถ่ายทอดสด */}
      {livePrograms.length > 0 && <LiveProgramSection items={livePrograms} />}
      
      {/* 2. ไฮไลท์กีฬามันส์ ๆ */}
      {homeData?.highlights && homeData.highlights.length > 0 && (
        <HighlightSection items={homeData.highlights} />
      )}
      
      {/* 3. ประวัตินักกีฬา */}
      {homeData?.fighters && homeData.fighters.length > 0 && (
        <FighterCarouselSection fighters={homeData.fighters} />
      )}
      
      {/* 4. เต็มแมทช์ย้อนหลัง */}
      {homeData?.replays && homeData.replays.length > 0 && (
        <ReplaySection items={homeData.replays} />
      )}
      
      {/* 5. ข่าวสารกีฬา */}
      {homeData?.news && homeData.news.length > 0 && (
        <NewsSection items={homeData.news as NewsItem[]} />
      )}
    </div>
  );
}
