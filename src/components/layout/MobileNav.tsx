'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/lib/constants';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function MobileNav() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="sm" className="md:hidden text-white hover:text-gold p-2" />
        }
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </SheetTrigger>
      <SheetContent side="left" className="bg-pryde-dark border-border w-72 p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="p-6">
          <Link href="/" className="text-gradient-gold text-xl font-bold" onClick={() => setOpen(false)}>
            PRYDE TV
          </Link>
        </div>
        <nav className="flex flex-col">
          {NAV_ITEMS.map((item) => {
            const href = item.href || '/';
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={item.href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-6 py-3 text-sm font-medium transition-colors border-l-2',
                  isActive
                    ? 'text-gold border-gold bg-gold/5'
                    : 'text-white border-transparent hover:text-gold hover:bg-white/5'
                )}
              >
                {locale === 'th' ? item.labelTh : item.labelEn}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
