'use client';

import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  phone: z.string().min(9, 'Phone number is required'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading, error } = useAuth();
  const { t } = useLanguage();
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const success = await forgotPassword(data);
    if (success) {
      setIsSuccess(true);
      toast.success(t('ส่งลิงก์ตั้งรหัสผ่านใหม่แล้ว', 'Reset link sent successfully'));
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-background">
      <ResponsiveContainer className="max-w-md">
        <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-xl shadow-black/50">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">{t('ลืมรหัสผ่าน', 'Forgot Password')}</h1>
            <p className="text-muted-foreground text-sm">
              {t('กรุณากรอกเบอร์โทรศัพท์ที่ใช้ลงทะเบียน เพื่อรับลิงก์ตั้งรหัสผ่านใหม่', 'Enter your registered phone number to receive a password reset link')}
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-pryde-green/20 text-pryde-green rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✓
              </div>
              <p className="text-white">
                {t('เราได้ส่งข้อความ (SMS) พร้อมลิงก์ตั้งรหัสผ่านใหม่ไปยังเบอร์โทรศัพท์ของคุณแล้ว', 'We have sent an SMS with a password reset link to your phone number.')}
              </p>
              <Link href="/">
                <Button className="w-full bg-gold hover:bg-gold-light text-black font-bold h-12 rounded-xl mt-4">
                  {t('กลับหน้าหลัก', 'Back to Home')}
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  {...register('phone')}
                  placeholder={t('เบอร์โทรศัพท์', 'Phone Number')}
                  className="bg-muted border-border text-white placeholder:text-muted-foreground h-12"
                />
                {errors.phone && <p className="text-xs text-pryde-red mt-1">{errors.phone.message}</p>}
              </div>

              {error && (
                <div className="bg-pryde-red/10 text-pryde-red text-sm p-3 rounded-lg">{error}</div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold hover:bg-gold-light text-black font-bold h-12 rounded-xl text-base mt-6"
              >
                {isLoading ? t('กำลังส่ง...', 'Sending...') : t('ส่งลิงก์', 'Send Link')}
              </Button>
            </form>
          )}

          {!isSuccess && (
            <p className="text-center text-sm mt-8">
              <Link href="/" className="text-muted-foreground hover:text-white transition-colors">
                {t('กลับหน้าหลัก', 'Back to Home')}
              </Link>
            </p>
          )}
        </div>
      </ResponsiveContainer>
    </div>
  );
}
