'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { ROUTES } from '@/lib/constants';
import { ResponsiveContainer } from '@/components/shared/ResponsiveContainer';

export function Footer() {
  const { t } = useLanguage();

  return (
    <>
      <footer className="bg-white border-t border-gray-200 mt-16 text-[#4A4A4A]">
        <ResponsiveContainer className="py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Left: Copyright */}
            <div className="text-xs md:text-sm">
              Copyright ©2024 PrydeTV All Rights Reserved.สงวนลิขสิทธิ์ทุกประการ
            </div>

            {/* Right: Links and App Stores */}
            <div className="flex items-center gap-4 text-xs md:text-sm">
              <Link href={ROUTES.TERMS} className="hover:text-black transition-colors">
                ข้อกำหนดเงื่อนไข
              </Link>
              <div className="w-[1px] h-4 bg-gray-300" />
              <Link href={ROUTES.POLICY} className="hover:text-black transition-colors">
                นโยบายความเป็นส่วนตัว
              </Link>

              {/* App Store / Google Play Badges */}
              <div className="flex items-center gap-2 ml-4">
                <Link href="#" className="block w-24 h-8 bg-black rounded-md overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-medium border border-gray-700 rounded-md">
                    App Store
                  </div>
                </Link>
                <Link href="#" className="block w-24 h-8 bg-black rounded-md overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-medium border border-gray-700 rounded-md">
                    Google Play
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </footer>

      {/* Floating LINE Button */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 bg-[#00B900] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <span className="text-white text-xs font-bold">LINE</span>
      </a>
    </>
  );
}
