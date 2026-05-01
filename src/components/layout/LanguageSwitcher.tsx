'use client';

import { useLanguageStore } from '@/stores/languageStore';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/types/common';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguageStore();

  const toggleLocale = () => {
    const next: Locale = locale === 'th' ? 'en' : 'th';
    setLocale(next);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="text-white hover:text-gold hover:bg-transparent font-medium text-sm px-2"
    >
      {locale === 'th' ? 'EN' : 'TH'}
    </Button>
  );
}
