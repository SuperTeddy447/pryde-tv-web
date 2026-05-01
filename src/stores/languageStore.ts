import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/types/common';

interface LanguageState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (th: string, en: string) => string;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      locale: 'th',

      setLocale: (locale) => set({ locale }),

      t: (th, en) => (get().locale === 'th' ? th : en),
    }),
    {
      name: 'pryde-language-storage',
      partialize: (state) => ({ locale: state.locale }),
    }
  )
);
