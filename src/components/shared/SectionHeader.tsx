'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  titleTh: string;
  titleEn: string;
  onViewMore?: () => void;
  className?: string;
}

export function SectionHeader({ titleTh, titleEn, onViewMore, className }: SectionHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
        {t(titleTh, titleEn)}
      </h2>
      {onViewMore && (
        <button
          onClick={onViewMore}
          className="text-sm text-gold hover:text-gold-light transition-colors font-medium"
        >
          {t('ดูเพิ่มเติม →', 'View More →')}
        </button>
      )}
    </div>
  );
}
