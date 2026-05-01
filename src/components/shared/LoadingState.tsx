'use client';
import { useLanguage } from '@/hooks/useLanguage';

export function LoadingState() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-muted-foreground">{t('กำลังโหลด...', 'Loading...')}</p>
    </div>
  );
}

export function LoadingCardGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden bg-card">
          <div className="aspect-video animate-shimmer" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 animate-shimmer rounded" />
            <div className="h-3 w-1/2 animate-shimmer rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
