'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageSwitcher } from './LanguageSwitcher';
import { UserMenu } from './UserMenu';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Header() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-pryde-black/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link href="/" className="text-gradient-gold text-xl md:text-2xl font-bold tracking-wide">
              PRYDE TV
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const href = item.href || '/';
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    'px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'text-gold bg-gold/10'
                      : 'text-white/80 hover:text-gold hover:bg-white/5'
                  )}
                >
                  {locale === 'th' ? item.labelTh : item.labelEn}
                </Link>
              );
            })}
          </nav>

          {/* Right: Language + User */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
