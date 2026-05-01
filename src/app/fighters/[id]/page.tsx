'use client';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '@/services';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { useLanguage } from '@/hooks/useLanguage';
import { formatRecord } from '@/lib/format';
import Image from 'next/image';

export default function FighterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { locale, t } = useLanguage();
  const { data: fighter, isLoading, isError, refetch } = useQuery({
    queryKey: ['fighter-detail', id], queryFn: () => contentService.getFighterDetail(id),
  });

  if (isLoading) return <div className="pt-20"><LoadingState /></div>;
  if (isError || !fighter) return <div className="pt-20"><ErrorState onRetry={refetch} /></div>;

  return (
    <div className="pt-16 pb-12">
      <div className="relative h-48 md:h-64">
        <Image src={fighter.coverUrl} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <ResponsiveContainer className="-mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
          <div className="w-32 h-32 rounded-full border-4 border-gold overflow-hidden bg-card">
            <Image src={fighter.avatarUrl} alt={fighter.name} width={128} height={128} className="object-cover w-full h-full" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{locale === 'en' && fighter.nameEn ? fighter.nameEn : fighter.name}</h1>
            <p className="text-lg text-gold">{locale === 'en' && fighter.nicknameEn ? fighter.nicknameEn : fighter.nickname}</p>
            <p className="text-muted-foreground">{fighter.weightClass} • {fighter.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: t('ชนะ', 'Wins'), value: fighter.wins, color: 'text-pryde-green' },
            { label: t('แพ้', 'Losses'), value: fighter.losses, color: 'text-pryde-red' },
            { label: t('เสมอ', 'Draws'), value: fighter.draws, color: 'text-white' },
            { label: 'KO', value: fighter.ko, color: 'text-gold' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-4 text-center border border-border/50">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h2 className="text-lg font-semibold text-white mb-2">{t('สถิติ', 'Record')}</h2>
          <p className="text-muted-foreground">{formatRecord(fighter.wins, fighter.losses, fighter.draws)}</p>
          {fighter.gym && <p className="text-muted-foreground mt-1">{t('ค่าย', 'Gym')}: {fighter.gym}</p>}
          {fighter.height && <p className="text-muted-foreground">{t('ส่วนสูง', 'Height')}: {fighter.height}</p>}
          {fighter.weight && <p className="text-muted-foreground">{t('น้ำหนัก', 'Weight')}: {fighter.weight}</p>}
          {fighter.age && <p className="text-muted-foreground">{t('อายุ', 'Age')}: {fighter.age}</p>}
        </div>
      </ResponsiveContainer>
    </div>
  );
}
