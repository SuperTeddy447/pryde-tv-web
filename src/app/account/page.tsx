'use client';

import { useAuthStore } from '@/stores/authStore';
import { useAccount } from '@/hooks/useAccount';
import { useLanguage } from '@/hooks/useLanguage';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingState } from '@/components/shared/LoadingState';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCoin } from '@/lib/format';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ACCOUNT_MENU = [
  { icon: '🪙', labelTh: 'เติมเหรียญ', labelEn: 'Top Up', href: ROUTES.ACCOUNT_COIN },
  { icon: '📋', labelTh: 'ประวัติเหรียญ', labelEn: 'Coin History', href: ROUTES.ACCOUNT_COIN_HISTORY },
  { icon: '👤', labelTh: 'ตั้งค่าโปรไฟล์', labelEn: 'Profile', href: ROUTES.ACCOUNT_PROFILE },
  { icon: '🎁', labelTh: 'Redeem Code', labelEn: 'Redeem Code', href: ROUTES.ACCOUNT_REDEEM },
  { icon: '📺', labelTh: 'สแกน QR เข้า TV', labelEn: 'TV QR', href: ROUTES.ACCOUNT_TV_QR },
  { icon: '💬', labelTh: 'ติดต่อ LINE OA', labelEn: 'Contact LINE', href: ROUTES.CONTACT },
  { icon: '📜', labelTh: 'เงื่อนไขการใช้งาน', labelEn: 'Terms', href: ROUTES.TERMS },
  { icon: '🔒', labelTh: 'นโยบายความเป็นส่วนตัว', labelEn: 'Privacy', href: ROUTES.POLICY },
];

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { coinBalance, prydePoints, isLoading } = useAccount();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;
  if (isLoading) return <div className="pt-20"><LoadingState /></div>;

  return (
    <div className="pt-16 pb-12">
      {/* Profile Banner */}
      <div className="relative h-40 md:h-52 bg-gradient-to-r from-gold/20 via-pryde-dark to-gold/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=300&fit=crop')] bg-cover bg-center opacity-20" />
      </div>

      <ResponsiveContainer>
        {/* Avatar & Name */}
        <div className="-mt-16 relative z-10 flex flex-col items-center text-center mb-8">
          <Avatar className="w-28 h-28 border-4 border-gold shadow-lg shadow-gold/20">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-gold text-black text-2xl font-bold">{user.name[0]}</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-white mt-3">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.phone}</p>
        </div>

        {/* Wallet Card */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-gradient-to-br from-gold/20 via-card to-gold/5 rounded-2xl p-6 border border-gold/20">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t('ยอดเหรียญ', 'Coin Balance')}</p>
                <p className="text-3xl font-bold text-gold">🪙 {formatCoin(coinBalance)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">{t('Pryde Points', 'Pryde Points')}</p>
                <p className="text-lg font-semibold text-white">⭐ {formatCoin(prydePoints)}</p>
              </div>
            </div>
            <Link href={ROUTES.ACCOUNT_COIN} className="block mt-4">
              <button className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3 rounded-xl transition-colors">
                {t('เติมเหรียญ', 'Top Up Coins')}
              </button>
            </Link>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-3">
            {ACCOUNT_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 hover:border-gold/30 hover:bg-gold/5 transition-all"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium text-white">{t(item.labelTh, item.labelEn)}</span>
              </Link>
            ))}
          </div>

          {/* Language & Logout */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => { logout(); router.push('/'); }}
              className="w-full py-3 text-center text-pryde-red font-semibold rounded-xl bg-card border border-border/50 hover:bg-pryde-red/10 transition-colors"
            >
              {t('ออกจากระบบ', 'Sign Out')}
            </button>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
