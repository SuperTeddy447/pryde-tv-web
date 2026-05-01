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
import { Settings, ChevronRight, Coins, Gift, Link as LinkIcon, Users, Download, Headset, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AccountPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { coinBalance, isLoading } = useAccount();
  const { t, locale } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;
  if (isLoading) return <div className="pt-24 bg-white min-h-screen"><LoadingState /></div>;

  return (
    <div className="pt-16 pb-12 bg-[#F8F9FA] min-h-screen font-kanit">
      <ResponsiveContainer>
        {/* Top Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 mt-4">
          {/* Banner */}
          <div className="h-40 md:h-56 relative">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1599322116086-4e58b9909241?w=1600&h=400&fit=crop')` }}
            />
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Avatar - Centered */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#C2A437] p-0.5 bg-white shadow-lg overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
                    <AvatarFallback className="bg-gray-100 text-[#C2A437] text-2xl font-bold">{user.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="pt-12 pb-6 px-6 text-center">
            <h1 className="text-xl md:text-2xl font-bold text-black">(1234) {user.name}</h1>
            <p className="text-gray-500 text-sm mt-1">{user.phone}</p>

            <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4 border-t border-gray-50 pt-4">
              <div className="flex items-center gap-4">
                <button className="bg-[#C2A437] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm shadow-[#C2A437]/20">
                  {t('บริการแนะนำ', 'Recommended')}
                </button>
                <button className="text-gray-600 hover:text-black px-4 py-2 text-sm font-medium transition-colors">
                  {t('ประวัติการทายผล', 'Prediction History')}
                </button>
              </div>

              <Link href={ROUTES.ACCOUNT_PROFILE}>
                <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  {t('ตั้งค่าบัญชี', 'Account Settings')}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Wallet */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-50">
                <h2 className="font-bold text-lg text-black">{t('กระเป๋าเงิน', 'Wallet')}</h2>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Gold Card */}
                <div className="bg-[#FDFBF2] border border-[#F2E8C4] rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FACC15] to-[#94790C] text-black flex items-center justify-center text-[10px] font-bold shadow-sm">
                      <Star className="w-5 h-5 fill-black text-black" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-black">{formatCoin(coinBalance || 1000000)}</span>
                  </div>
                </div>

                {/* Silver Card */}
                <Link href={ROUTES.ACCOUNT_COIN_HISTORY} className="block group">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold border border-gray-300">
                          P
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-black">{formatCoin(10000)}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 pl-11">10 พอยต์ หมดอายุ 31 ธ.ค. 2569</p>
                  </div>
                </Link>

                {/* Bottom link */}
                <Link href={ROUTES.ACCOUNT_COIN_HISTORY} className="flex items-center justify-between pt-2 px-1 text-sm text-gray-600 hover:text-black font-medium group transition-colors">
                  <span>{t('ประวัติการใช้งานเหรียญ', 'Coin History')}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Services Grid */}
          <div className="lg:col-span-8">
            <h2 className="font-bold text-lg text-black mb-4 px-2">{t('บริการแนะนำ', 'Recommended Services')}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Service Item 1: Top Up */}
              <Link href={ROUTES.ACCOUNT_COIN} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-[#C2A437] group-hover:scale-110 transition-transform">
                  <Coins className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-black">{t('เติมเหรียญ', 'Top Up')}</span>
              </Link>

              {/* Service Item 2: Gift */}
              <Link href="#" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                  <Gift className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-black">{t('แลกของขวัญ', 'Redeem Gift')}</span>
              </Link>

              {/* Service Item 3: Link Account */}
              <Link href="#" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <LinkIcon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-black">{t('เชื่อมบัญชี', 'Link Account')}</span>
              </Link>

              {/* Service Item 4: Refer Friends */}
              <Link href="#" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-black">{t('เชิญเพื่อน', 'Refer Friends')}</span>
              </Link>

              {/* Service Item 5: Redeem Code */}
              <Link href={ROUTES.ACCOUNT_REDEEM} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-black">{t('Redeem Code', 'Redeem Code')}</span>
              </Link>

              {/* Service Item 6: Contact Admin */}
              <Link href={ROUTES.CONTACT} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                  <Headset className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-black">{t('ติดต่อแอดมิน', 'Contact Admin')}</span>
              </Link>
            </div>
          </div>

        </div>
      </ResponsiveContainer>
    </div>
  );
}
