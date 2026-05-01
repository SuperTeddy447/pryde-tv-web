'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { formatRecord } from '@/lib/format';
import type { RankingItem } from '@/types/content';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface RankingCardProps {
  item: RankingItem;
}

export function RankingCard({ item }: RankingCardProps) {
  const { locale } = useLanguage();
  const changeIcon = item.change === 'up' ? '▲' : item.change === 'down' ? '▼' : '–';
  const changeColor = item.change === 'up' ? 'text-pryde-green' : item.change === 'down' ? 'text-pryde-red' : 'text-muted-foreground';

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-gold/30 transition-all">
      <div className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg',
        item.rank <= 3 ? 'bg-gold text-black' : 'bg-muted text-white'
      )}>
        {item.rank}
      </div>
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border flex-shrink-0">
        <Image src={item.fighter.avatarUrl} alt={item.fighter.name} width={48} height={48} className="object-cover w-full h-full" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm truncate">
          {locale === 'en' && item.fighter.nameEn ? item.fighter.nameEn : item.fighter.name}
        </p>
        <p className="text-xs text-muted-foreground">{item.weightClass} • {formatRecord(item.fighter.wins, item.fighter.losses, item.fighter.draws)}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-gold">{item.points} pts</p>
        <p className={cn('text-xs', changeColor)}>
          {changeIcon} {item.changeAmount > 0 ? item.changeAmount : ''}
        </p>
      </div>
    </div>
  );
}
