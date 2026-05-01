'use client';

import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { useEffect, useState } from 'react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(9, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerAuth, isLoading, error } = useAuth();
  const { isAuthenticated } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const success = await registerAuth(data);
    if (success) router.push('/');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-background">
      <ResponsiveContainer className="max-w-md">
        <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-xl shadow-black/50">
          <div className="text-center mb-8">
            <h1 className="text-gradient-gold text-3xl font-bold mb-2">PRYDE TV</h1>
            <p className="text-muted-foreground">{t('สมัครสมาชิกใหม่', 'Create new account')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                {...register('name')}
                placeholder={t('ชื่อ-นามสกุล', 'Full Name')}
                className="bg-muted border-border text-white placeholder:text-muted-foreground h-12"
              />
              {errors.name && <p className="text-xs text-pryde-red mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <Input
                {...register('phone')}
                placeholder={t('เบอร์โทรศัพท์', 'Phone Number')}
                className="bg-muted border-border text-white placeholder:text-muted-foreground h-12"
              />
              {errors.phone && <p className="text-xs text-pryde-red mt-1">{errors.phone.message}</p>}
            </div>

            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder={t('รหัสผ่าน', 'Password')}
                className="bg-muted border-border text-white placeholder:text-muted-foreground h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              {errors.password && <p className="text-xs text-pryde-red mt-1">{errors.password.message}</p>}
            </div>

            <div className="relative">
              <Input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('ยืนยันรหัสผ่าน', 'Confirm Password')}
                className="bg-muted border-border text-white placeholder:text-muted-foreground h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
              {errors.confirmPassword && <p className="text-xs text-pryde-red mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {error && (
              <div className="bg-pryde-red/10 text-pryde-red text-sm p-3 rounded-lg">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold hover:bg-gold-light text-black font-bold h-12 rounded-xl text-base mt-6"
            >
              {isLoading ? t('กำลังสมัคร...', 'Signing up...') : t('สมัครสมาชิก', 'Sign Up')}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {t('มีบัญชีอยู่แล้ว?', 'Already have an account?')}
            {' '}
            <Link href="/" onClick={() => useAuthStore.getState().openLoginModal()} className="text-gold hover:text-gold-light font-semibold">
              {t('เข้าสู่ระบบ', 'Sign In')}
            </Link>
          </p>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
