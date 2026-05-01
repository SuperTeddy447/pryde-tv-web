'use client';
import { useAuthStore } from '@/stores/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { LoadingState } from '@/components/shared/LoadingState';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccountService } from '@/services/adapters/accountService';
import type { TvQrCode } from '@/types/account';
import Image from 'next/image';

export default function TvQrPage() {
  const { isAuthenticated } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();
  const [qrData, setQrData] = useState<TvQrCode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchQr = async () => {
      try {
        const service = getAccountService();
        const data = await service.getTvQrCode();
        setQrData(data);
      } catch (e) {
        // error handled
      } finally {
        setIsLoading(false);
      }
    };
    fetchQr();
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer className="max-w-md mx-auto">
        <SectionHeader titleTh="📺 สแกน QR เข้า TV" titleEn="📺 TV Login QR" />
        
        <div className="bg-card rounded-2xl p-8 border border-border/50 text-center">
          <p className="text-muted-foreground mb-6">
            {t('เปิดแอป Pryde TV บนสมาร์ททีวีของคุณแล้วสแกน QR Code นี้เพื่อเข้าสู่ระบบ', 'Open Pryde TV app on your Smart TV and scan this QR code to login')}
          </p>
          
          {isLoading ? (
            <LoadingState />
          ) : qrData ? (
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-xl mb-6">
                <div className="relative w-48 h-48">
                  <Image src={qrData.qrUrl} alt="TV Login QR Code" fill className="object-contain" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{t('หรือกรอกรหัส:', 'Or enter code:')}</p>
              <p className="text-2xl font-bold text-gold tracking-widest mt-1">{qrData.code}</p>
            </div>
          ) : (
            <p className="text-pryde-red">{t('ไม่สามารถโหลด QR Code ได้', 'Failed to load QR Code')}</p>
          )}
        </div>
      </ResponsiveContainer>
    </div>
  );
}
