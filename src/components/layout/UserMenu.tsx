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
        className="bg-[#C2A437] hover:bg-[#DFB943] text-white font-medium text-[18px] rounded-md px-6 h-[44px] transition-all"
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
          "hidden md:flex items-center gap-2 text-[18px] font-medium transition-colors h-[44px] px-3 rounded-md",
          isDark 
            ? "bg-[#1E1E1E]/80 hover:bg-[#1E1E1E] border border-white/10 text-white" 
            : "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-black"
        )}
      >
        <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-[#FACC15] to-[#94790C] text-black flex items-center justify-center text-[10px] md:text-[12px] font-bold shadow-sm">★</span>
        <span>{formatCoin(user.coinBalance || 10000)}</span>
      </Link>
      
      {/* Silver Point (P) */}
      <div 
        className={cn(
          "hidden md:flex items-center gap-2 text-[18px] font-medium h-[44px] px-3 rounded-md",
          isDark 
            ? "bg-[#1E1E1E]/80 border border-white/10 text-white" 
            : "bg-gray-100 border border-gray-200 text-black"
        )}
      >
        <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-300 text-black flex items-center justify-center text-[10px] md:text-[12px] font-bold shadow-sm">P</span>
        <span>{formatCoin(10000)}</span>
      </div>

      {/* User Avatar & Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger 
          render={
            <button 
              className={cn(
                "flex items-center gap-2 transition-colors focus:outline-none h-[44px] px-2 md:px-3 rounded-md",
                isDark 
                  ? "bg-[#1E1E1E]/80 hover:bg-[#1E1E1E] border border-white/10" 
                  : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
              )}
            >
              <Avatar className="w-7 h-7 md:w-8 md:h-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-[#C2A437] text-white text-xs">{user.name[0]}</AvatarFallback>
              </Avatar>
              <span className={cn(
                "text-[18px] font-medium hidden md:inline-block",
                isDark ? "text-white" : "text-black"
              )}>
                {user.name}
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
