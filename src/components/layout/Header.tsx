'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, ROUTES } from '@/lib/constants';
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

  const isHomePage = pathname === ROUTES.HOME || pathname === '/';
  const isDarkTheme = isHomePage && !scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isDarkTheme ? 'bg-transparent text-white' : 'bg-white shadow-sm border-b border-gray-100 text-black'
      )}
    >
      <div className="max-w-[1440px] mx-auto px-2 md:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link href="/" className="text-gradient-gold text-xl md:text-2xl font-bold tracking-wide">
              PRYDE TV
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 h-full">
            {NAV_ITEMS.map((item) => {
              const href = item.href || '/';
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              const hasDropdown = item.href === ROUTES.PROGRAMS || item.href === ROUTES.FIGHTERS;
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    'flex items-center h-full px-1.5 lg:px-2 text-sm md:text-base font-medium transition-colors border-b-[3px]',
                    isActive
                      ? isDarkTheme ? 'text-white border-gold' : 'text-black border-gold'
                      : isDarkTheme ? 'text-white/80 border-transparent hover:text-white hover:border-gold/50' : 'text-gray-600 border-transparent hover:text-black hover:border-gold/50'
                  )}
                >
                  {locale === 'th' ? item.labelTh : item.labelEn}
                  {hasDropdown && (
                    <span className={cn('ml-1 text-[10px]', isDarkTheme ? 'opacity-70' : 'text-gray-400')}>▼</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Language + User */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <UserMenu isDark={isDarkTheme} />
            <LanguageSwitcher isDark={isDarkTheme} />
          </div>
        </div>
      </div>
    </header>
  );
}
