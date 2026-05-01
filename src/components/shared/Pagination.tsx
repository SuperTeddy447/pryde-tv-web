'use client';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { t } = useLanguage();
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="border-border text-white hover:bg-gold hover:text-black"
      >
        {t('ก่อนหน้า', 'Previous')}
      </Button>
      <span className="text-sm text-muted-foreground px-4">
        {currentPage} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="border-border text-white hover:bg-gold hover:text-black"
      >
        {t('ถัดไป', 'Next')}
      </Button>
    </div>
  );
}
