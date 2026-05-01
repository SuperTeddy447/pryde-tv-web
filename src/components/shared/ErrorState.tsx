'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <p className="text-muted-foreground mb-4">
        {message ?? t('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'Something went wrong. Please try again.')}
      </p>
      {onRetry && (
        <Button onClick={onRetry} className="bg-gold hover:bg-gold-light text-black font-semibold">
          {t('ลองใหม่', 'Retry')}
        </Button>
      )}
    </div>
  );
}
