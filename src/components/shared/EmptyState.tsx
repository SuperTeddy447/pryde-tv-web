'use client';
import { useLanguage } from '@/hooks/useLanguage';

interface EmptyStateProps {
  messageTh?: string;
  messageEn?: string;
  icon?: string;
}

export function EmptyState({ messageTh, messageEn, icon = '📭' }: EmptyStateProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <p className="text-muted-foreground">
        {t(messageTh ?? 'ไม่พบข้อมูล', messageEn ?? 'No data found')}
      </p>
    </div>
  );
}
