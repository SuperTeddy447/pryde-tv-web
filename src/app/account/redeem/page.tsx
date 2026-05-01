'use client';
import { useAuthStore } from '@/stores/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccountService } from '@/services/adapters/accountService';
import { toast } from 'sonner';

export default function RedeemCodePage() {
  const { isAuthenticated, updateCoinBalance } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();
  const [code, setCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleRedeem = async () => {
    if (!code.trim()) return;
    setIsProcessing(true);
    try {
      const service = getAccountService();
      const res = await service.redeemCode({ code });
      if (res.success) {
        updateCoinBalance(res.newBalance);
        toast.success(t(`แลกสำเร็จ! ได้รับ ${res.amount} เหรียญ`, `Redeemed successfully! Got ${res.amount} coins`));
        setCode('');
      }
    } catch (e) {
      toast.error(t('โค้ดไม่ถูกต้องหรือถูกใช้งานไปแล้ว', 'Invalid or expired code'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer className="max-w-md mx-auto">
        <SectionHeader titleTh="🎁 Redeem Code" titleEn="🎁 Redeem Code" />
        
        <div className="bg-card rounded-2xl p-8 border border-border/50 text-center">
          <p className="text-muted-foreground mb-6">
            {t('กรอกรหัสโปรโมชั่นเพื่อรับเหรียญหรือสิทธิพิเศษ', 'Enter promo code to receive coins or special privileges')}
          </p>
          
          <div className="space-y-4">
            <Input 
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="PRYDE-XXXX-XXXX"
              className="bg-muted border-border text-white text-center text-lg tracking-widest h-14"
            />
            
            <Button
              onClick={handleRedeem}
              disabled={isProcessing || !code.trim()}
              className="w-full bg-gold hover:bg-gold-light text-black font-bold h-12 rounded-xl text-base"
            >
              {isProcessing ? t('กำลังตรวจสอบ...', 'Checking...') : t('แลกรับสิทธิ์', 'Redeem')}
            </Button>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
