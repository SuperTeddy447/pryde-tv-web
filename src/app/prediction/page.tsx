'use client';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { useLanguage } from '@/hooks/useLanguage';

export default function PredictionPage() {
  const { t } = useLanguage();
  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer>
        <SectionHeader titleTh="🎯 ทายผลการแข่งขัน" titleEn="🎯 Predictions" />
        <div className="bg-card rounded-2xl border border-border/50 p-12 mt-8">
          <EmptyState 
            icon="🎯"
            messageTh="เร็วๆ นี้! ระบบทายผลการแข่งขันลุ้นรับ Pryde Points" 
            messageEn="Coming Soon! Match prediction system to win Pryde Points" 
          />
        </div>
      </ResponsiveContainer>
    </div>
  );
}
