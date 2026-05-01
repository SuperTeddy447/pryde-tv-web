'use client';
import { useLanguageStore } from '@/stores/languageStore';

export function useLanguage() {
  const { locale, setLocale, t } = useLanguageStore();
  return { locale, setLocale, t };
}
