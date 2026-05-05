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
import Image from 'next/image';
import { ROUTES } from '@/lib/constants';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  member_phone: z.string().min(9, 'กรุณากรอกเบอร์โทรศัพท์'),
  member_password: z.string().min(4, 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร'),
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
      <DialogContent className="bg-white border border-[#d4d4d4] sm:max-w-[450px] p-0 overflow-hidden max-h-[95vh] overflow-y-auto rounded-2xl shadow-xl">
        {/* Logo */}
        <div className="flex justify-center pt-6 pb-2">
          <Image src="/img/logo-500.png" alt="PRYDE TV" width={200} height={80} className="object-contain" />
        </div>

        {/* Heading */}
        <div className="text-center px-6">
          <DialogTitle className="text-[18px] font-medium text-[#0a0a0a]">
            {t('เข้าสู่ระบบ', 'Sign In')}
          </DialogTitle>
        </div>

        <div className="px-6 pb-6 space-y-3">
          {/* Phone login form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-normal text-[#404040]">
                {t('เบอร์โทรศัพท์', 'Phone Number')}
              </label>
              <Input
                {...register('member_phone')}
                placeholder="0812345678"
                className="min-h-[40px] px-3 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white focus:border-[#bba556] focus:ring-[#bba556]"
              />
              {errors.member_phone && <p className="text-xs text-red-500">{errors.member_phone.message}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-normal text-[#404040]">
                {t('รหัสผ่าน', 'Password')}
              </label>
              <div className="relative">
                <Input
                  {...register('member_password')}
                  type={showPassword ? 'text' : 'password'}
                  className="min-h-[40px] px-3 pr-10 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white focus:border-[#bba556] focus:ring-[#bba556]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333] bg-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.member_password && <p className="text-xs text-red-500">{errors.member_password.message}</p>}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-[12px] p-3 rounded-lg border border-red-200">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-[40px] rounded-lg bg-[#927d4f] hover:bg-[#7a6a43] text-white text-[12px] font-medium"
            >
              {isLoading ? t('กำลังเข้าสู่ระบบ...', 'Signing in...') : t('เข้าสู่ระบบ', 'Sign In')}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex justify-center items-center">
            <span className="text-[#404040] text-[12px]">{t('หรือเข้าสู่ระบบด้วย', 'or sign in with')}</span>
          </div>

          {/* Register button */}
          <Button
            onClick={() => { closeLoginModal(); window.location.href = ROUTES.REGISTER; }}
            className="w-full min-h-[40px] rounded-md bg-[#d3b23e] hover:bg-[#c0a035] text-white text-[12px] font-medium"
          >
            {t('สมัครสมาชิก', 'Register')}
          </Button>

          {/* LINE Login */}
          <Button
            onClick={loginWithLine}
            disabled={isLoading}
            className="w-full min-h-[40px] rounded-md bg-[#06c755] hover:bg-[#05b34c] text-white text-[12px] font-medium border border-[#06c755]"
          >
            {t('เข้าสู่ระบบด้วย LINE', 'Sign in with LINE')}
          </Button>

          {/* Apple Login */}
          <Button
            onClick={loginWithApple}
            disabled={isLoading}
            variant="outline"
            className="w-full min-h-[40px] rounded-md bg-white text-black text-[12px] font-medium border border-black hover:bg-gray-50"
          >
            🍎 {t('เข้าสู่ระบบด้วย Apple', 'Sign in with Apple')}
          </Button>

          {/* Forgot password & contact admin */}
          <div className="flex justify-center items-center gap-1 border-b border-[#d3d3d399] pb-4 text-[12px]">
            <span className="text-[#404040]">{t('ลืมรหัสผ่าน', 'Forgot password')}</span>
            <Link href={ROUTES.CONTACT} onClick={closeLoginModal} className="text-[#e33122] font-medium">
              {t('ติดต่อแอดมิน', 'Contact Admin')}
            </Link>
            <span>/</span>
            <Link href={ROUTES.FORGOT_PASSWORD} onClick={closeLoginModal} className="text-[#e33122] font-medium">
              {t('กู้รหัสผ่าน', 'Recovery')}
            </Link>
          </div>

          {/* Policy */}
          <div className="flex flex-col items-center text-[12px] text-[#404040]">
            <span>{t('เมื่อเข้าสู่ระบบ คุณยอมรับ', 'By signing in, you agree to')}</span>
            <span>
              <Link href={ROUTES.TERMS} onClick={closeLoginModal} className="text-[#210504] underline">
                {t('เงื่อนไขการใช้งาน', 'Terms')}
              </Link>
              {' '}{t('และ', 'and')}{' '}
              <Link href={ROUTES.POLICY} onClick={closeLoginModal} className="text-[#210504] underline">
                {t('นโยบายความเป็นส่วนตัว', 'Privacy Policy')}
              </Link>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
