'use client';

import { useLanguageStore } from '@/stores/languageStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Locale } from '@/types/common';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ isDark = true }: { isDark?: boolean }) {
  const { locale, setLocale } = useLanguageStore();

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            className={cn(
              'border rounded-md px-2 py-1.5 h-auto flex items-center gap-1.5 text-sm font-medium transition-colors focus:outline-none',
              isDark 
                ? 'bg-[#1E1E1E]/80 hover:bg-[#1E1E1E] border-white/10 text-white' 
                : 'bg-white hover:bg-gray-50 border-gray-300 text-black'
            )}
          >
            {locale === 'th' ? 'ไทย' : 'EN'}
            <span className={cn("text-[10px]", isDark ? "text-white/70" : "text-gray-500")}>▼</span>
          </button>
        }
      />
      <DropdownMenuContent align="end" className={cn("w-24 border-white/10", isDark ? "bg-[#1E1E1E] text-white" : "bg-white text-black")}>
        <DropdownMenuItem onClick={() => handleSetLocale('th')} className="cursor-pointer">
          ไทย
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetLocale('en')} className="cursor-pointer">
          EN
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
