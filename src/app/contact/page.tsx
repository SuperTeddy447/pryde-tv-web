'use client';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { useLanguage } from '@/hooks/useLanguage';

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer className="max-w-2xl">
        <SectionHeader titleTh="💬 ติดต่อเรา" titleEn="💬 Contact Us" />
        <div className="bg-card rounded-2xl border border-border/50 p-8">
          <p className="text-muted-foreground mb-8">
            {t('หากมีข้อสงสัยหรือพบปัญหาในการใช้งาน สามารถติดต่อทีมงาน Pryde TV ได้ตามช่องทางด้านล่างนี้', 'If you have any questions or encounter issues, please contact the Pryde TV team via the channels below.')}
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <span className="text-3xl text-[#00C300]">💬</span>
              <div>
                <h3 className="font-semibold text-white">LINE Official Account</h3>
                <p className="text-sm text-muted-foreground">@prydetv (มี @ ด้านหน้า)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <span className="text-3xl">📧</span>
              <div>
                <h3 className="font-semibold text-white">Email</h3>
                <p className="text-sm text-muted-foreground">support@prydetv.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <span className="text-3xl">📞</span>
              <div>
                <h3 className="font-semibold text-white">Call Center</h3>
                <p className="text-sm text-muted-foreground">02-XXX-XXXX (เวลาทำการ 09:00 - 18:00 น.)</p>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
