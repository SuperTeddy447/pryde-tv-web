'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/authStore';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

const loginSchema = z.object({
  phone: z.string().min(9, 'Phone number is required'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuthStore();
  const { loginWithPhone, loginWithLine, loginWithApple, isLoading, error } = useAuth();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await loginWithPhone(data);
    if (success) closeLoginModal();
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="bg-pryde-dark border-border sm:max-w-md p-0 overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-b from-gold/10 to-transparent p-6 pb-4 text-center">
          <DialogTitle className="text-gradient-gold text-2xl font-bold">PRYDE TV</DialogTitle>
          <p className="text-muted-foreground text-sm mt-1">
            {t('เข้าสู่ระบบเพื่อดูมวยไทยสด', 'Sign in to watch live Muay Thai')}
          </p>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Phone login form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <Input
                {...register('phone')}
                placeholder={t('เบอร์โทรศัพท์', 'Phone Number')}
                className="bg-muted border-border text-white placeholder:text-muted-foreground h-11"
              />
              {errors.phone && <p className="text-xs text-pryde-red mt-1">{errors.phone.message}</p>}
            </div>
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('รหัสผ่าน', 'Password')}
                className="bg-muted border-border text-white placeholder:text-muted-foreground h-11 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white text-sm"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              {errors.password && <p className="text-xs text-pryde-red mt-1">{errors.password.message}</p>}
            </div>

            {error && (
              <div className="bg-pryde-red/10 text-pryde-red text-xs p-3 rounded-lg">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold hover:bg-gold-light text-black font-bold h-11 rounded-lg"
            >
              {isLoading ? t('กำลังเข้าสู่ระบบ...', 'Signing in...') : t('เข้าสู่ระบบ', 'Sign In')}
            </Button>
          </form>

          <div className="text-center">
            <Link href={ROUTES.FORGOT_PASSWORD} onClick={closeLoginModal} className="text-xs text-gold hover:text-gold-light">
              {t('ลืมรหัสผ่าน?', 'Forgot Password?')}
            </Link>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-pryde-dark px-3 text-muted-foreground">{t('หรือ', 'or')}</span>
            </div>
          </div>

          {/* Social logins */}
          <div className="space-y-2">
            <Button
              onClick={loginWithLine}
              disabled={isLoading}
              variant="outline"
              className="w-full h-11 border-[#00C300] text-[#00C300] hover:bg-[#00C300]/10 font-semibold rounded-lg"
            >
              <span className="mr-2 text-lg">💬</span> {t('เข้าสู่ระบบด้วย LINE', 'Sign in with LINE')}
            </Button>
            <Button
              onClick={loginWithApple}
              disabled={isLoading}
              variant="outline"
              className="w-full h-11 border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg"
            >
              <span className="mr-2 text-lg">🍎</span> {t('เข้าสู่ระบบด้วย Apple', 'Sign in with Apple')}
            </Button>
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-muted-foreground">
            {t('ยังไม่มีบัญชี?', "Don't have an account?")}{' '}
            <Link href={ROUTES.REGISTER} onClick={closeLoginModal} className="text-gold hover:text-gold-light font-semibold">
              {t('สมัครสมาชิก', 'Sign Up')}
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
