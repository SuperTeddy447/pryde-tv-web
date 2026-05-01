'use client';
import { useAccount } from '@/hooks/useAccount';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuthStore } from '@/stores/authStore';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { COIN_PACKAGES } from '@/lib/constants';
import { formatCoin, formatCurrency } from '@/lib/format';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccountService } from '@/services/adapters/accountService';
import { toast } from 'sonner';

export default function CoinTopupPage() {
  const { isAuthenticated, updateCoinBalance } = useAuthStore();
  const { coinBalance, refetchBalance } = useAccount();
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  const handleTopup = async () => {
    if (!selectedPkg) return;
    const pkg = COIN_PACKAGES.find((p) => p.id === selectedPkg);
    if (!pkg) return;

    setIsProcessing(true);
    try {
      const service = getAccountService();
      const res = await service.topupCoin({ amount: pkg.amount, paymentMethod: 'promptpay' });
      if (res.success) {
        updateCoinBalance(res.newBalance);
        refetchBalance();
        toast.success(t('เติมเหรียญสำเร็จ!', 'Top up successful!'));
        router.push('/account');
      }
    } catch (e) {
      toast.error(t('เกิดข้อผิดพลาด', 'Error occurred'));
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer className="max-w-3xl">
        <SectionHeader titleTh="🪙 เติมเหรียญ" titleEn="🪙 Top Up Coins" />
        
        <div className="bg-card rounded-2xl p-6 border border-border/50 mb-8 text-center">
          <p className="text-muted-foreground mb-2">{t('ยอดเหรียญคงเหลือ', 'Current Balance')}</p>
          <p className="text-4xl font-bold text-gold">🪙 {formatCoin(coinBalance)}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {COIN_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPkg(pkg.id)}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                selectedPkg === pkg.id ? 'border-gold bg-gold/5' : 'border-border/50 hover:border-gold/30 bg-card'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pryde-red text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </span>
              )}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold text-white flex items-center gap-2">
                    🪙 {formatCoin(pkg.amount)}
                  </p>
                  {pkg.bonus > 0 && (
                    <p className="text-xs text-pryde-green font-medium mt-1">
                      + Bonus {pkg.bonus}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{formatCurrency(pkg.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleTopup}
          disabled={!selectedPkg || isProcessing}
          className="w-full bg-gold hover:bg-gold-light text-black font-bold h-12 rounded-xl text-base"
        >
          {isProcessing ? t('กำลังดำเนินการ...', 'Processing...') : t('ยืนยันการชำระเงิน', 'Confirm Payment')}
        </Button>
      </ResponsiveContainer>
    </div>
  );
}
