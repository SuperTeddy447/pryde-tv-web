'use client';

import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveContainer({ children, className }: ResponsiveContainerProps) {
  return (
    <div className={cn('w-full max-w-[1440px] mx-auto px-2 md:px-4 lg:px-6', className)}>
      {children}
    </div>
  );
}
