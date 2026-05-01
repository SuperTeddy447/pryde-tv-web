'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { formatRecord } from '@/lib/format';
import type { Fighter } from '@/types/content';

interface FighterCardProps {
  fighter: Fighter;
  href: string;
}

export function FighterCard({ fighter, href }: FighterCardProps) {
  const { locale, t } = useLanguage();

  return (
    <Link href={href} className="group block">
      <div className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 text-center">
        <div className="relative h-32 overflow-hidden">
          <Image src={fighter.coverUrl} alt="" fill className="object-cover" sizes="300px" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
        </div>
        <div className="-mt-12 relative z-10 px-4 pb-4">
          <div className="w-20 h-20 rounded-full mx-auto border-3 border-gold overflow-hidden bg-card">
            <Image src={fighter.avatarUrl} alt={fighter.name} width={80} height={80} className="object-cover w-full h-full" />
          </div>
          <h3 className="font-bold text-white text-sm mt-2 group-hover:text-gold transition-colors">
            {locale === 'en' && fighter.nameEn ? fighter.nameEn : fighter.name}
          </h3>
          <p className="text-xs text-gold">{locale === 'en' && fighter.nicknameEn ? fighter.nicknameEn : fighter.nickname}</p>
          <p className="text-xs text-muted-foreground mt-1">{fighter.weightClass}</p>
          <p className="text-xs text-muted-foreground mt-1">{formatRecord(fighter.wins, fighter.losses, fighter.draws)}</p>
          {fighter.ranking <= 10 && (
            <span className="inline-block mt-2 text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">
              #{fighter.ranking} {t('อันดับ', 'Ranked')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
