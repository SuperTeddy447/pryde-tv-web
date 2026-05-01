'use client';
import { useAuthStore } from '@/stores/authStore';
import { useLanguage } from '@/hooks/useLanguage';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { accountService } from '@/services';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (user && !name) setName(user.name);
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const handleUpdate = async () => {
    if (!name.trim()) return;
    setIsProcessing(true);
    try {
      const updatedUser = await accountService.updateProfile({ name });
      setUser(updatedUser);
      toast.success(t('อัปเดตโปรไฟล์สำเร็จ', 'Profile updated successfully'));
    } catch (e) {
      toast.error(t('เกิดข้อผิดพลาด', 'Error occurred'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-20 pb-12">
      <ResponsiveContainer className="max-w-md mx-auto">
        <SectionHeader titleTh="👤 ตั้งค่าโปรไฟล์" titleEn="👤 Profile Settings" />
        
        <div className="space-y-4 bg-card rounded-2xl p-6 border border-border/50">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              {t('ชื่อ-นามสกุล', 'Name')}
            </label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-muted border-border text-white placeholder:text-muted-foreground h-11"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              {t('เบอร์โทรศัพท์', 'Phone Number')}
            </label>
            <Input 
              value={user.phone}
              disabled
              className="bg-muted/50 border-border text-white/50 h-11"
            />
          </div>
          
          <Button
            onClick={handleUpdate}
            disabled={isProcessing || name === user.name || !name.trim()}
            className="w-full bg-gold hover:bg-gold-light text-black font-bold h-11 rounded-lg mt-4"
          >
            {isProcessing ? t('กำลังบันทึก...', 'Saving...') : t('บันทึกข้อมูล', 'Save Changes')}
          </Button>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
