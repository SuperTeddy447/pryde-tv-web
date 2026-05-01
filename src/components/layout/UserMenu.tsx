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

export function UserMenu() {
  const { user, isAuthenticated, logout, openLoginModal } = useAuthStore();
  const { t } = useLanguage();

  if (!isAuthenticated || !user) {
    return (
      <Button
        onClick={openLoginModal}
        className="bg-gold hover:bg-gold-light text-black font-semibold text-sm rounded-lg"
        size="sm"
      >
        {t('เข้าสู่ระบบ', 'Sign In')}
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href={ROUTES.ACCOUNT_COIN} className="hidden md:flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors">
        <span>🪙</span>
        <span className="font-semibold">{formatCoin(user.coinBalance)}</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Avatar className="w-8 h-8 border-2 border-gold">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-gold text-black text-xs">{user.name[0]}</AvatarFallback>
              </Avatar>
            </button>
          }
        />
        <DropdownMenuContent align="end" className="w-56 bg-card border-border">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold text-white">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.phone}</p>
            <p className="text-xs text-gold mt-1">🪙 {formatCoin(user.coinBalance)} coins</p>
          </div>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem render={<Link href={ROUTES.ACCOUNT} className="text-white hover:text-gold cursor-pointer" />}>
            {t('บัญชีของฉัน', 'My Account')}
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={ROUTES.ACCOUNT_COIN} className="text-white hover:text-gold cursor-pointer" />}>
            {t('เติมเหรียญ', 'Top Up Coins')}
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={ROUTES.ACCOUNT_PROFILE} className="text-white hover:text-gold cursor-pointer" />}>
            {t('ตั้งค่าโปรไฟล์', 'Profile Settings')}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem onClick={logout} className="text-pryde-red cursor-pointer">
            {t('ออกจากระบบ', 'Sign Out')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
