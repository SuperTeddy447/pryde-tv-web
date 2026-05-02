'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, ROUTES } from '@/lib/constants';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageSwitcher } from './LanguageSwitcher';
import { UserMenu } from './UserMenu';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  
  // Check if it's a 404 page (not a known route)
  const isKnownRoute = Object.values(ROUTES).some(route => 
    typeof route === 'string' ? pathname === route : false
  ) || pathname.startsWith('/live/') || pathname.startsWith('/news/') || pathname.startsWith('/fighters/');
  
  const is404 = !isKnownRoute;

  const isDarkTheme = (isHomePage || is404) && !scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isDarkTheme ? 'bg-transparent text-white' : 'bg-white shadow-sm border-b border-gray-100 text-black'
      )}
    >
      <div className="max-w-[1440px] mx-auto px-2 md:px-4 lg:px-6">
        <div className="flex items-center h-16 md:h-20">
          {/* Left: Mobile menu + Logo + Desktop nav */}
          <div className="flex items-center flex-1 gap-2">
            <MobileNav />
            <Link href="/" className="flex items-center mr-8">
              <Image 
                src="/logo-500 1.svg" 
                alt="Pryde TV Logo" 
                width={128} 
                height={80} 
                className="h-12 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* Center: Desktop nav (Moved here to be next to logo) */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6 h-full">
              {NAV_ITEMS.map((item) => {
                const href = item.href || '/';
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
                const hasDropdown = item.href === ROUTES.PROGRAMS || item.href === ROUTES.FIGHTERS;
                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={cn(
                      'flex items-center h-full px-2 lg:px-3 text-[18px] font-normal transition-colors border-b-[3px]',
                      isActive
                        ? isDarkTheme ? 'text-white border-gold' : 'text-black border-gold'
                        : isDarkTheme ? 'text-white border-transparent hover:text-white hover:border-gold/50' : 'text-gray-600 border-transparent hover:text-black hover:border-gold/50'
                    )}
                  >
                    {locale === 'th' ? item.labelTh : item.labelEn}
                    {hasDropdown && (
                      <ChevronDown className={cn('ml-1 w-4 h-4', isDarkTheme ? 'text-white' : 'text-gray-400')} />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

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
