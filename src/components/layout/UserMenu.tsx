'use client';

import { useAuthStore } from '@/stores/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { formatCoin } from '@/lib/format';

import { cn } from '@/lib/utils';

export function UserMenu({ isDark = true }: { isDark?: boolean }) {
  const { user, isAuthenticated, logout, openLoginModal } = useAuthStore();
  const { t } = useLanguage();

  if (!isAuthenticated || !user) {
    return (
      <Button
        onClick={openLoginModal}
        className="bg-gold hover:bg-gold-light text-white font-semibold text-sm rounded-lg px-6"
        size="sm"
      >
        {t('เข้าสู่ระบบ', 'Sign In')}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Gold Coin */}
      <Link 
        href={ROUTES.ACCOUNT_COIN} 
        className={cn(
          "hidden md:flex items-center gap-1.5 text-sm transition-colors",
          isDark 
            ? "bg-[#1E1E1E]/80 hover:bg-[#1E1E1E] border border-white/10 rounded-md px-2 py-1.5 text-white" 
            : "bg-transparent text-black px-0.5"
        )}
      >
        <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-r from-[#FACC15] to-[#94790C] text-black flex items-center justify-center text-[8px] md:text-[10px] font-bold">★</span>
        <span className="font-semibold">{formatCoin(user.coinBalance || 10000)}</span>
      </Link>
      
      {/* Silver Point (P) */}
      <div 
        className={cn(
          "hidden md:flex items-center gap-1.5 text-sm",
          isDark 
            ? "bg-[#1E1E1E]/80 border border-white/10 rounded-md px-2 py-1.5 text-white" 
            : "bg-transparent text-black px-0.5"
        )}
      >
        <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gray-300 text-black flex items-center justify-center text-[8px] md:text-[10px] font-bold">P</span>
        <span className="font-semibold">{formatCoin(10000)}</span>
      </div>

      {/* User Avatar & Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger 
          render={
            <button 
              className={cn(
                "flex items-center gap-1.5 transition-colors focus:outline-none",
                isDark 
                  ? "bg-[#1E1E1E]/80 hover:bg-[#1E1E1E] border border-white/10 rounded-md pl-1 pr-2 md:pr-3 py-1 md:py-1.5" 
                  : "bg-transparent pl-0.5 pr-1.5 py-1"
              )}
            >
              <Avatar className="w-6 h-6 md:w-7 md:h-7">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-gold text-black text-xs">{user.name[0]}</AvatarFallback>
              </Avatar>
              <span className={cn(
                "text-sm font-semibold hidden md:inline-block",
                isDark ? "text-white" : "text-black"
              )}>
                (1234) {user.name}
              </span>
            </button>
          }
        />
        <DropdownMenuContent align="end" className="w-56 bg-[#1E1E1E] border-white/10 text-white">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-white/60">{user.phone}</p>
          </div>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem render={<Link href={ROUTES.ACCOUNT} className="cursor-pointer hover:bg-white/10 focus:bg-white/10" />}>
            {t('บัญชีของฉัน', 'My Account')}
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={ROUTES.ACCOUNT_COIN} className="cursor-pointer hover:bg-white/10 focus:bg-white/10" />}>
            {t('เติมเหรียญ', 'Top Up Coins')}
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={ROUTES.ACCOUNT_PROFILE} className="cursor-pointer hover:bg-white/10 focus:bg-white/10" />}>
            {t('ตั้งค่าโปรไฟล์', 'Profile Settings')}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem onClick={logout} className="text-red-400 cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-red-400">
            {t('ออกจากระบบ', 'Sign Out')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
