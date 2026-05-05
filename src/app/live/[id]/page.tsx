'use client';

import { use } from 'react';
import { useLiveDetail } from '@/hooks/useLiveDetail';
import { useAuthStore } from '@/stores/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { liveService } from '@/services';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDateTime, formatCoin } from '@/lib/format';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { LivePlayer } from '@/components/video/LivePlayer';

export default function LiveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: liveItem, isLoading, isError, refetch } = useLiveDetail(id);
  const { isAuthenticated, openLoginModal, user } = useAuthStore();
  const { locale, t } = useLanguage();
  const [isPurchased, setIsPurchased] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (liveItem?.isPurchased) setIsPurchased(true);
  }, [liveItem]);

  const handlePurchase = async () => {
    if (!isAuthenticated) { openLoginModal(); return; }
    setPurchasing(true);
    try {
      await liveService.purchaseLive({ liveId: id });
      setIsPurchased(true);
      toast.success(t('ซื้อสำเร็จ!', 'Purchase successful!'));
    } catch {
      toast.error(t('เกิดข้อผิดพลาด', 'Something went wrong'));
    } finally {
      setPurchasing(false);
    }
  };

  if (isLoading) return <div className="pt-20"><LoadingState /></div>;
  if (isError || !liveItem) return <div className="pt-20"><ErrorState onRetry={refetch} /></div>;

  const title = locale === 'en' && liveItem.titleEn ? liveItem.titleEn : liveItem.title;
  const desc = locale === 'en' && liveItem.descriptionEn ? liveItem.descriptionEn : liveItem.description;

  return (
    <div className="pt-16 pb-12">
      {/* Player / Purchase area */}
      <div className="bg-black">
        {isPurchased ? (
          <div className="max-w-5xl mx-auto p-4 md:p-8">
            <LivePlayer 
              streamUrl={liveItem.streamUrl}
              matchId={id}
              memberId={user?.id}
              watchToken={liveItem.watch_token} // assuming it exists in the item
              className="shadow-2xl shadow-gold/10"
            />
          </div>
        ) : (
          <div className="relative aspect-video max-w-5xl mx-auto overflow-hidden">
            <Image src={liveItem.coverUrl} alt={title} fill className="object-cover opacity-30 blur-sm" />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6">
              <Badge className={`mb-4 text-sm ${liveItem.status === 'live' ? 'bg-pryde-red live-badge' : 'bg-gold text-black'} border-none`}>
                {liveItem.status === 'live' ? '🔴 LIVE' : t('เร็วๆ นี้', 'UPCOMING')}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>
              <p className="text-white/60 text-sm mb-6">{desc}</p>
              <div className="bg-card/80 backdrop-blur rounded-2xl p-6 max-w-sm w-full border border-gold/20">
                <p className="text-gold text-3xl font-bold mb-1">🪙 {formatCoin(liveItem.priceCoin)}</p>
                <p className="text-muted-foreground text-sm mb-4">{t('เหรียญ', 'Coins')}</p>
                <Button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="w-full bg-gold hover:bg-gold-light text-black font-bold h-12 rounded-xl text-base"
                >
                  {purchasing
                    ? t('กำลังดำเนินการ...', 'Processing...')
                    : t('ซื้อเพื่อดู', 'Purchase to Watch')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details */}
      <ResponsiveContainer className="mt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
            <p className="text-muted-foreground mb-4">{desc}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>📅 {formatDateTime(liveItem.startTime, locale)}</span>
              <span>📍 {liveItem.venue}</span>
              <span>🥊 {liveItem.matchCount} {t('คู่', 'matches')}</span>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
