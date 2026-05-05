'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

/**
 * AuthGuard component that checks authentication status.
 * If the user is not authenticated, it opens the login modal or redirects to sign-in.
 * 
 * Usage:
 * ```tsx
 * <AuthGuard>
 *   <YourProtectedContent />
 * </AuthGuard>
 * ```
 * 
 * Matches the legacy behavior from middleware/auth.js:
 * - Pages like live, profile, wallet, predict require authentication
 * - Unauthenticated users are redirected to /sign-in
 */
export function AuthGuard({ children, fallbackUrl = '/sign-in' }: AuthGuardProps) {
  const { isAuthenticated, token, openLoginModal } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      // Check if token exists in localStorage (legacy compat)
      const legacyToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!legacyToken) {
        // Redirect to sign-in
        router.push(fallbackUrl);
      }
    }

    // Check JWT expiry
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
          // Token expired, clear and redirect
          useAuthStore.getState().logout();
          router.push(fallbackUrl);
        }
      } catch {
        // Invalid token format, ignore
      }
    }
  }, [isAuthenticated, token, router, fallbackUrl]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#927d4f] mx-auto mb-4" />
          <p className="text-[#404040] text-sm">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
