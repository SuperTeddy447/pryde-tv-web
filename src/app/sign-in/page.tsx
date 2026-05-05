'use client';

import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants';
import { useEffect, useState, Suspense } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { PhoneInputWithCountry } from '@/components/auth/PhoneInputWithCountry';
import { parsePhoneNumber } from 'libphonenumber-js';


const loginSchema = z.object({
  member_phone: z.string().min(9, 'กรุณากรอกเบอร์โทรศัพท์'),
  member_password: z.string().min(4, 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function SignInContent() {
  const { loginWithPhone, loginWithLine, loginWithApple, processLineCallback, isLoading, error } = useAuth();
  const { isAuthenticated } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [banMessage, setBanMessage] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  // Handle ban/suspend status from URL
  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'ban' || status === 'suspend') {
      setBanMessage('บัญชีของคุณถูกระงับ กรุณาติดต่อแอดมิน');
    }
  }, [searchParams]);

  // Handle LINE callback code
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      processLineCallback(code).then((success) => {
        if (success) router.push('/');
      });
    }
  }, [searchParams]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // Extract clean phone and country code
    let cleanPhone = data.member_phone;
    let countryCode = 'TH';
    let countryCallingCode = '+66';

    try {
      const parsed = parsePhoneNumber(data.member_phone);
      if (parsed) {
        cleanPhone = parsed.nationalNumber;
        countryCode = parsed.country || 'TH';
        countryCallingCode = `+${parsed.countryCallingCode}`;
      }
    } catch (e) {
      // Fallback
    }

    const success = await loginWithPhone({
      member_phone: cleanPhone,
      member_password: data.member_password,
      countryCode,
      countryCallingCode
    });
    if (success) router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4 py-8">
      <div className="w-full max-w-[450px] p-6 flex flex-col items-center gap-2 rounded-2xl border border-[#d4d4d4] bg-white shadow-md">
        {/* Logo */}
        <div className="w-logo">
          <Image src="/logo-500.svg" alt="PRYDE TV" width={250} height={100} className="object-contain max-w-[250px] md:max-w-[250px]" />
        </div>

        {/* Heading */}
        <h4 className="text-[18px] font-medium text-[#0a0a0a]">
          {t('เข้าสู่ระบบ', 'Sign In')}
        </h4>

        {/* Ban message */}
        {banMessage && (
          <div className="w-full bg-red-50 text-red-600 text-[12px] p-3 rounded-lg border border-red-200">{banMessage}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1 phone-input-container">
            <PhoneInputWithCountry
              value={watch('member_phone')}
              onChange={(phone) => setValue('member_phone', phone)}
              placeholder={t('กรอกเบอร์โทรศัพท์', 'Enter phone number')}
              error={errors.member_phone?.message}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="member_password" className="text-[12px] font-normal text-[#404040]">
              {t('รหัสผ่าน', 'Password')}
            </label>
            <div className="relative">
              <Input
                {...register('member_password')}
                id="member_password"
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
            id="login"
            className="w-full min-h-[40px] rounded-lg bg-[#927d4f] hover:bg-[#7a6a43] text-white text-[12px] font-medium"
          >
            {isLoading ? t('กำลังเข้าสู่ระบบ...', 'Signing in...') : t('เข้าสู่ระบบ', 'Sign In')}
          </Button>
        </form>

        {/* Or divider */}
        <div className="w-full flex justify-center items-center">
          <span className="text-[#404040] text-[12px]">{t('หรือเข้าสู่ระบบด้วย', 'or sign in with')}</span>
        </div>

        {/* Register */}
        <div className="w-full">
          <Button
            onClick={() => router.push(ROUTES.REGISTER)}
            className="w-full min-h-[40px] rounded-md bg-[#d3b23e] hover:bg-[#c0a035] text-white text-[12px] font-medium"
          >
            {t('สมัครสมาชิก', 'Register')}
          </Button>
        </div>

        {/* LINE Login */}
        <div className="w-full mt-2">
          <Button
            id="line-login"
            onClick={loginWithLine}
            disabled={isLoading}
            className="w-full min-h-[40px] rounded-md bg-[#06c755] hover:bg-[#05b34c] text-white text-[12px] font-medium border border-[#06c755]"
          >
            {t('เข้าสู่ระบบด้วย LINE', 'Sign in with LINE')}
          </Button>
        </div>

        {/* Apple Login */}
        <div className="w-full mt-0 pt-0">
          <Button
            onClick={loginWithApple}
            disabled={isLoading}
            variant="outline"
            className="w-full min-h-[40px] rounded-md bg-white text-black text-[12px] font-medium border border-black hover:bg-gray-50"
          >
            🍎 {t('เข้าสู่ระบบด้วย Apple', 'Sign in with Apple')}
          </Button>
        </div>

        {/* Forgot password */}
        <div className="flex items-center justify-center gap-1 w-full text-[12px] border-b border-[#d3d3d399] pb-4">
          <span className="text-[#404040]">{t('ลืมรหัสผ่าน', 'Forgot password')}</span>
          <Link href={ROUTES.CONTACT} className="text-[#e33122] font-medium cursor-pointer">
            {t('ติดต่อแอดมิน', 'Contact Admin')}
          </Link>
          <span>/</span>
          <Link href={ROUTES.FORGOT_PASSWORD} className="text-[#e33122] font-medium cursor-pointer">
            {t('กู้รหัสผ่าน', 'Recovery')}
          </Link>
        </div>

        {/* Policy */}
        <div className="flex flex-col items-center text-[12px] text-[#404040]">
          <span>{t('เมื่อเข้าสู่ระบบ คุณยอมรับ', 'By signing in, you agree to')}</span>
          <span>
            <Link href={ROUTES.TERMS} className="text-[#210504]">
              {t('เงื่อนไขการใช้งาน', 'Terms')}
            </Link>
            {' '}{t('และ', 'and')}{' '}
            <Link href={ROUTES.POLICY} className="text-[#210504]">
              {t('นโยบายความเป็นส่วนตัว', 'Privacy Policy')}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
