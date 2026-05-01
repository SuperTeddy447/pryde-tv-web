'use client';
import { useQuery } from '@tanstack/react-query';
import { RankingCard } from '@/components/cards/RankingCard';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { WEIGHT_CLASSES } from '@/lib/constants';
import { useState } from 'react';
import { contentService } from '@/services';

export default function RankingPage() {
  const [selectedWeight, setSelectedWeight] = useState<string>(WEIGHT_CLASSES[12]); // Default Middleweight or something
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['ranking', selectedWeight], 
    queryFn: () => contentService.getRanking(), // In real app, pass selectedWeight as filter
  });

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer>
        <SectionHeader titleTh="🏆 อันดับนักกีฬา" titleEn="🏆 Rankings" />
        
        {/* Weight Class Filter */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide">
          {WEIGHT_CLASSES.slice(6, 14).map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedWeight === weight
                  ? 'bg-gold text-black'
                  : 'bg-card text-muted-foreground hover:text-white border border-border/50'
              }`}
            >
              {weight}
            </button>
          ))}
        </div>

        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.items.map((item) => (
              <RankingCard key={item.fighter.id} item={item} />
            ))}
          </div>
        ) : null}
      </ResponsiveContainer>
    </div>
  );
}
