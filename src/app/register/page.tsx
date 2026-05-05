'use client';

import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const registerSchema = z.object({
  member_phone: z.string().min(9, 'กรุณากรอกเบอร์โทรศัพท์'),
  member_password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  member_confirm_password: z.string(),
  member_email: z.string().email('อีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  member_gender: z.string().optional(),
}).refine((data) => data.member_password === data.member_confirm_password, {
  message: 'รหัสผ่านไม่ตรงกัน',
  path: ['member_confirm_password'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const MONTHS_TH = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function generateYears() {
  const years = [];
  for (let y = 2024; y >= 1950; y--) years.push(y);
  return years;
}

export default function RegisterPage() {
  const { register: registerAuth, isLoading, error } = useAuth();
  const { isAuthenticated } = useAuthStore();
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [birthDay, setBirthDay] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      member_gender: '',
    }
  });

  const onSubmit = async (data: RegisterFormData) => {
    // Construct birthday
    let member_birthday = null;
    if (birthDay && birthMonth && birthYear) {
      const d = birthDay.padStart(2, '0');
      const m = birthMonth.padStart(2, '0');
      member_birthday = `${birthYear}-${m}-${d} 00:00:00.000`;
    }

    const payload = {
      member_phone: data.member_phone.replace(/[^a-zA-Z0-9]/g, ''),
      member_password: data.member_password,
      member_email: data.member_email || null,
      member_gender: data.member_gender || null,
      member_birthday,
      countryCode: 'TH',
      countryCallingCode: '+66',
    };

    const success = await registerAuth(payload);
    if (success) {
      router.push('/sign-in');
    }
  };

  const months = locale === 'en' ? MONTHS_EN : MONTHS_TH;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4 py-8">
      <div className="w-full max-w-[450px] p-6 flex flex-col items-center gap-3 rounded-2xl border border-[#d4d4d4] bg-white shadow-md">
        {/* Heading */}
        <div className="flex justify-center items-center w-full">
          <h5 className="text-[24px] font-medium text-[#0a0a0a]">
            {t('สมัครสมาชิก', 'Register')}
          </h5>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-normal">{t('เบอร์โทรศัพท์', 'Phone Number')}</label>
            <Input
              {...register('member_phone')}
              placeholder="0812345678"
              className="min-h-[36px] px-3 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white focus:border-[#bba556]"
            />
            {errors.member_phone && <p className="text-xs text-red-500">{errors.member_phone.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-normal">{t('รหัสผ่าน', 'Password')}</label>
            <div className="relative">
              <Input
                {...register('member_password')}
                type={showPassword ? 'text' : 'password'}
                className="min-h-[36px] px-3 pr-10 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white focus:border-[#bba556]"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999] bg-white p-1">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.member_password && <p className="text-xs text-red-500">{errors.member_password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-normal">{t('ยืนยันรหัสผ่าน', 'Confirm Password')}</label>
            <div className="relative">
              <Input
                {...register('member_confirm_password')}
                type={showConfirmPassword ? 'text' : 'password'}
                className="min-h-[36px] px-3 pr-10 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white focus:border-[#bba556]"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999] bg-white p-1">
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.member_confirm_password && <p className="text-xs text-red-500">{errors.member_confirm_password.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-normal">{t('อีเมล', 'Email')}</label>
            <Input
              {...register('member_email')}
              type="text"
              className="min-h-[36px] px-3 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white focus:border-[#bba556]"
            />
            {errors.member_email && <p className="text-xs text-red-500">{errors.member_email.message}</p>}
          </div>

          {/* Birthday */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-normal">{t('วันเกิด', 'Date of Birth')}</label>
            <div className="flex gap-2">
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className="flex-1 min-h-[36px] px-2 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white"
              >
                <option value="">{t('วัน', 'Day')}</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d.toString()}>{d}</option>
                ))}
              </select>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="flex-1 min-h-[36px] px-2 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white"
              >
                <option value="">{t('เดือน', 'Month')}</option>
                {months.map((m, i) => (
                  <option key={i} value={(i + 1).toString()}>{m}</option>
                ))}
              </select>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="flex-1 min-h-[36px] px-2 border border-[#d3d3d3] rounded-md text-[14px] text-[#0a0a0a] bg-white"
              >
                <option value="">{t('ปี', 'Year')}</option>
                {generateYears().map(y => (
                  <option key={y} value={y.toString()}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-normal">{t('เพศ', 'Gender')}</label>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1 text-[12px] cursor-pointer">
                <input type="radio" value="male" {...register('member_gender')} className="accent-[#927d4f]" />
                {t('ชาย', 'Male')}
              </label>
              <label className="flex items-center gap-1 text-[12px] cursor-pointer">
                <input type="radio" value="female" {...register('member_gender')} className="accent-[#927d4f]" />
                {t('หญิง', 'Female')}
              </label>
              <label className="flex items-center gap-1 text-[12px] cursor-pointer">
                <input type="radio" value="" {...register('member_gender')} className="accent-[#927d4f]" />
                {t('ไม่ระบุ', 'Not specified')}
              </label>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="accent-[#927d4f]"
            />
            <label className="text-[12px]">
              {t('ยอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว', 'Accept Terms and Privacy Policy')}
            </label>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-[12px] p-3 rounded-lg border border-red-200">{error}</div>
          )}

          {/* Footer buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => router.back()}
              variant="outline"
              className="w-full min-h-[40px] rounded-lg border border-[#737373] bg-white text-[#560000] text-[14px]"
            >
              {t('ยกเลิก', 'Cancel')}
            </Button>
            <Button
              type="submit"
              disabled={!isChecked || isLoading}
              className="w-full min-h-[40px] rounded-lg bg-[#927d4f] hover:bg-[#7a6a43] text-white text-[14px] font-medium disabled:opacity-50"
            >
              {isLoading ? t('กำลังสมัคร...', 'Signing up...') : t('สมัครสมาชิก', 'Register')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
