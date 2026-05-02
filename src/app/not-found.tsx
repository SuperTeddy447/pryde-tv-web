'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { ROUTES } from '@/lib/constants';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-kanit">
      
      {/* Background Image (Full Screen) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Cover-1.svg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Optional overlay to ensure text readability if the image is too bright */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl w-full px-6 text-center animate-fade-in-up flex flex-col items-center">
        
        {/* 404.svg - Clickable and Centered */}
        <Link 
          href={ROUTES.HOME} 
          className="relative w-full max-w-xl aspect-[2/1] mb-4 group cursor-pointer transition-transform hover:scale-105 duration-500 drop-shadow-2xl"
        >
          <Image
            src="/404.svg"
            alt="404"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>
    </div>
  );
}
