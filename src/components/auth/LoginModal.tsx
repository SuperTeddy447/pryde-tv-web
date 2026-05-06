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
import { PhoneInputWithCountry } from './PhoneInputWithCountry';
import { parsePhoneNumber } from 'libphonenumber-js';


const loginSchema = z.object({
  member_phone: z.string().min(9, 'กรุณากรอกเบอร์โทรศัพท์'),
  member_password: z.string().min(4, 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร'),
});

const registerSchema = z.object({
  member_phone: z.string().min(9, 'กรุณากรอกเบอร์โทรศัพท์'),
  member_password: z.string().min(4, 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร'),
  confirm_password: z.string().min(4, 'กรุณายืนยันรหัสผ่าน'),
  member_email: z.string().email('อีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  member_birthday: z.string().optional(),
  member_gender: z.enum(['male', 'female', 'other']).optional(),
  accept_terms: z.boolean().refine(val => val === true, 'คุณต้องยอมรับเงื่อนไขการใช้งาน'),
}).refine((data) => data.member_password === data.confirm_password, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirm_password"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuthStore();
  const { loginWithPhone, registerWithPhone, loginWithLine, loginWithApple, isLoading, error } = useAuth();
  const { t } = useLanguage();
  const [view, setView] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login Form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Register Form
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      member_gender: 'male',
      accept_terms: true,
    }
  });

  const onLoginSubmit = async (data: LoginFormData) => {
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
    } catch (e) {}

    const success = await loginWithPhone({
      member_phone: cleanPhone,
      member_password: data.member_password,
      countryCode,
      countryCallingCode
    });
    if (success) closeLoginModal();
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
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
    } catch (e) {}

    const success = await registerWithPhone({
      member_phone: cleanPhone,
      member_password: data.member_password,
      member_email: data.member_email || '',
      member_birthday: data.member_birthday || '',
      member_gender: data.member_gender || 'male',
      countryCode,
      countryCallingCode
    });
    
    if (success) {
      setView('login');
      // Optionally show success message or auto-login
    }
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="bg-white border border-[#d4d4d4] sm:max-w-[450px] p-0 max-h-[95vh] overflow-y-auto rounded-2xl shadow-xl">
        {/* Logo */}
        <div className="flex justify-center pt-6 pb-2">
          <Image src="/logo-500.svg" alt="PRYDE TV" width={200} height={80} className="object-contain" />
        </div>

        <div className="text-center px-6">
          <DialogTitle className="text-[24px] font-bold text-[#0a0a0a]">
            {view === 'login' ? t('เข้าสู่ระบบ', 'Sign In') : t('สมัครสมาชิก', 'Register')}
          </DialogTitle>
        </div>

        <div className="px-6 pb-6 space-y-3">
          {view === 'login' ? (
            <>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="flex flex-col gap-1 phone-input-container">
                  <label className="text-[12px] font-normal text-[#404040]">
                    {t('เบอร์โทรศัพท์', 'Phone Number')}
                  </label>
                  <PhoneInputWithCountry
                    value={loginForm.watch('member_phone')}
                    onChange={(phone) => loginForm.setValue('member_phone', phone)}
                    placeholder={t('กรอกเบอร์โทรศัพท์', 'Enter phone number')}
                    error={loginForm.formState.errors.member_phone?.message}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-normal text-[#404040]">
                    {t('รหัสผ่าน', 'Password')}
                  </label>
                  <div className="relative">
                    <Input
                      {...loginForm.register('member_password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('กรอกรหัสผ่าน', 'Enter password')}
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
                  {loginForm.formState.errors.member_password && <p className="text-xs text-red-500">{loginForm.formState.errors.member_password.message}</p>}
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-[12px] p-3 rounded-lg border border-red-200">{error}</div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full min-h-[44px] rounded-lg bg-[#927d4f] hover:bg-[#7a6a43] text-white text-[14px] font-medium"
                >
                  {isLoading ? t('กำลังเข้าสู่ระบบ...', 'Signing in...') : t('เข้าสู่ระบบ', 'Sign In')}
                </Button>
              </form>

              {/* Divider */}
              <div className="flex justify-center items-center py-2">
                <span className="text-[#404040] text-[12px]">{t('หรือเข้าสู่ระบบด้วย', 'or sign in with')}</span>
              </div>

              {/* Register button */}
              <Button
                onClick={() => setView('register')}
                className="w-full min-h-[44px] rounded-md bg-[#d3b23e] hover:bg-[#c0a035] text-white text-[14px] font-medium"
              >
                {t('สมัครสมาชิก', 'Register')}
              </Button>

              {/* SSO Logins */}
              <div className="space-y-2 pt-2">
                <Button
                  onClick={loginWithLine}
                  disabled={isLoading}
                  className="w-full min-h-[44px] rounded-md bg-[#06c755] hover:bg-[#05b34c] text-white text-[14px] font-medium"
                >
                  {t('เข้าสู่ระบบด้วย LINE', 'Sign in with LINE')}
                </Button>

                <Button
                  onClick={loginWithApple}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full min-h-[44px] rounded-md bg-white text-black text-[14px] font-medium border border-black hover:bg-gray-50"
                >
                  🍎 {t('เข้าสู่ระบบด้วย Apple', 'Sign in with Apple')}
                </Button>
              </div>

              {/* Footer Links */}
              <div className="flex justify-center items-center gap-1 border-b border-[#d3d3d399] pb-4 pt-2 text-[12px]">
                <span className="text-[#404040]">{t('ลืมรหัสผ่าน', 'Forgot password')}</span>
                <Link href={ROUTES.CONTACT} onClick={closeLoginModal} className="text-[#e33122] font-medium">
                  {t('ติดต่อแอดมิน', 'Contact Admin')}
                </Link>
                <span>/</span>
                <Link href={ROUTES.FORGOT_PASSWORD} onClick={closeLoginModal} className="text-[#e33122] font-medium">
                  {t('กู้รหัสผ่าน', 'Recovery')}
                </Link>
              </div>
            </>
          ) : (
            /* REGISTER VIEW */
            <>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                {/* Phone */}
                <div className="flex flex-col gap-1 phone-input-container">
                  <label className="text-[12px] font-medium text-[#0a0a0a]">
                    {t('เบอร์โทรศัพท์', 'Phone Number')} <span className="text-red-500">*</span>
                  </label>
                  <PhoneInputWithCountry
                    value={registerForm.watch('member_phone')}
                    onChange={(phone) => registerForm.setValue('member_phone', phone)}
                    placeholder={t('กรอกเบอร์โทรศัพท์', 'Enter phone number')}
                    error={registerForm.formState.errors.member_phone?.message}
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-medium text-[#0a0a0a]">
                    {t('รหัสผ่าน', 'Password')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      {...registerForm.register('member_password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('กรอกรหัสผ่าน', 'Enter password')}
                      className="min-h-[40px] px-3 pr-10 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white focus:border-[#bba556]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999] p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {registerForm.formState.errors.member_password && <p className="text-xs text-red-500">{registerForm.formState.errors.member_password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-medium text-[#0a0a0a]">
                    {t('ยืนยันรหัสผ่าน', 'Confirm Password')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      {...registerForm.register('confirm_password')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t('กรอกยืนยันรหัสผ่าน', 'Confirm password')}
                      className="min-h-[40px] px-3 pr-10 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white focus:border-[#bba556]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999] p-1"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {registerForm.formState.errors.confirm_password && <p className="text-xs text-red-500">{registerForm.formState.errors.confirm_password.message}</p>}
                </div>

                {/* Personal Info Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#eee]"></span></div>
                  <div className="relative flex justify-center text-[11px] uppercase">
                    <span className="bg-white px-2 text-[#999]">{t('ข้อมูลส่วนบุคคล', 'Personal Information')}</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-medium text-[#0a0a0a]">{t('อีเมล', 'Email')}</label>
                  <Input
                    {...registerForm.register('member_email')}
                    type="email"
                    placeholder={t('กรอกอีเมล', 'Enter email')}
                    className="min-h-[40px] px-3 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white"
                  />
                  {registerForm.formState.errors.member_email && <p className="text-xs text-red-500">{registerForm.formState.errors.member_email.message}</p>}
                </div>

                {/* Birthday */}
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-medium text-[#0a0a0a]">{t('วันเกิด', 'Birthday')}</label>
                  <div className="relative">
                    <Input
                      {...registerForm.register('member_birthday')}
                      type="date"
                      className="min-h-[40px] px-3 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-medium text-[#0a0a0a]">{t('เพศ', 'Gender')}</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" {...registerForm.register('member_gender')} value="male" className="accent-[#927d4f] w-4 h-4" />
                      <span className="text-[14px]">{t('ชาย', 'Male')}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" {...registerForm.register('member_gender')} value="female" className="accent-[#927d4f] w-4 h-4" />
                      <span className="text-[14px]">{t('หญิง', 'Female')}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" {...registerForm.register('member_gender')} value="other" className="accent-[#927d4f] w-4 h-4" />
                      <span className="text-[14px]">{t('ไม่ระบุ', 'Other')}</span>
                    </label>
                  </div>
                </div>

                {/* Accept Terms */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    {...registerForm.register('accept_terms')}
                    id="accept_terms"
                    className="accent-[#927d4f] mt-1"
                  />
                  <label htmlFor="accept_terms" className="text-[12px] text-[#404040] leading-tight cursor-pointer">
                    {t('การสมัครสมาชิกถือว่ายอมรับข้อกำหนด เงื่อนไข และนโยบายความเป็นส่วนตัว', 'By registering, you accept the terms and conditions and privacy policy.')}
                  </label>
                </div>
                {registerForm.formState.errors.accept_terms && <p className="text-xs text-red-500">{registerForm.formState.errors.accept_terms.message}</p>}

                {error && (
                  <div className="bg-red-50 text-red-600 text-[12px] p-3 rounded-lg border border-red-200">{error}</div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full min-h-[44px] rounded-lg bg-[#d3b23e] hover:bg-[#c0a035] text-white text-[16px] font-bold"
                >
                  {isLoading ? t('กำลังสมัคร...', 'Registering...') : t('สมัครสมาชิก', 'Register')}
                </Button>

                <div className="flex justify-center items-center gap-2 pt-2">
                  <span className="text-[#0a0a0a] text-[14px]">{t('มีบัญชีอยู่แล้ว?', 'Already have an account?')}</span>
                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="text-[#d3b23e] font-medium text-[14px] hover:underline"
                  >
                    {t('เข้าสู่ระบบ', 'Sign In')}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Policy Links (Visible in both views) */}
          <div className="flex flex-col items-center text-[12px] text-[#404040] pt-4">
            <span>{t('เมื่อเข้าสู่ระบบ คุณยอมรับ', 'By signing in, you agree to')}</span>
            <span className="flex gap-1">
              <Link href={ROUTES.TERMS} onClick={closeLoginModal} className="text-[#210504] underline">
                {t('เงื่อนไขการใช้งาน', 'Terms')}
              </Link>
              {t('และ', 'and')}
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
