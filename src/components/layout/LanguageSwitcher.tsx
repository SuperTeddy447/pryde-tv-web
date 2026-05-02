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
import { ChevronDown } from 'lucide-react';

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
              'border rounded-md px-3 h-[44px] flex items-center gap-2 text-[18px] font-medium transition-colors focus:outline-none',
              isDark 
                ? 'bg-[#1E1E1E]/80 hover:bg-[#1E1E1E] border-white/10 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'
            )}
          >
            {locale === 'th' ? 'ไทย' : 'EN'}
            <ChevronDown className={cn("w-4 h-4", isDark ? "text-white" : "text-gray-500")} />
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
