import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services';
import type { LoginWithPhonePayload, RegisterPayload, ForgotPasswordPayload } from '@/types/auth';
import type { User } from '@/types/user';
import { useState } from 'react';

/**
 * Helper to convert legacy API response to our User type
 */
function mapLegacyMemberToUser(data: any, memberId?: string): User {
  return {
    id: memberId || data?.member_id?.toString() || '',
    name: data?.member_fname || '',
    phone: data?.member_phone || '',
    email: data?.member_email || '',
    avatarUrl: data?.member_avatar || '',
    coinBalance: data?.member_coin || 0,
    prydePointBalance: data?.member_point || 0,
    language: 'th',
  };
}

export function useAuth() {
  const {
    user, isAuthenticated, memberId,
    setAuth, setUser, setMemberId,
    logout: storeLogout,
    openLoginModal, closeLoginModal, isLoginModalOpen,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const service = authService;

  /**
   * Login with phone number + password
   * Maps to legacy: POST /auth/member/login-v2
   */
  const loginWithPhone = async (payload: LoginWithPhonePayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await service.loginWithPhone(payload);

      // Legacy API returns: { message, data, accessToken, MemberID }
      const memberData = res.data || res;
      const accessToken = res.accessToken || res.token || '';
      const mId = res.MemberID || memberData?.member_id?.toString() || '';
      const mappedUser = mapLegacyMemberToUser(memberData, mId);

      setAuth(accessToken, '', mappedUser, mId);

      // Store member info in legacy format for backward compat
      if (typeof window !== 'undefined') {
        localStorage.setItem('member', JSON.stringify({
          name: memberData?.member_fname,
          avatar: memberData?.member_avatar,
        }));
      }

      return true;
    } catch (e: any) {
      const errMsg = e?.errors || e?.message || '';
      if (errMsg === 'account has been suspended') {
        setError('บัญชีของคุณถูกระงับชั่วคราว กรุณาติดต่อแอดมิน');
      } else if (errMsg === 'account has been banned') {
        setError('บัญชีของคุณถูกแบน กรุณาติดต่อแอดมิน');
      } else if (errMsg === 'password invalid' || errMsg === 'username or password invalid') {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      } else if (errMsg === 'member not found') {
        setError('ไม่พบเบอร์โทรศัพท์นี้ในระบบ');
      } else {
        setError(errMsg || 'เข้าสู่ระบบไม่สำเร็จ');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login with LINE
   * Redirects to LINE OAuth, then callback processes the code
   */
  const loginWithLine = async () => {
    if (typeof window === 'undefined') return false;
    const clientId = process.env.NEXT_PUBLIC_LINE_CLIENT_ID;
    const redirectUrl = process.env.NEXT_PUBLIC_LINE_REDIRECT_URL || `${window.location.origin}/sign-in`;
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&state=pryde&scope=profile openid`;
    return true;
  };

  /**
   * Process LINE callback code
   */
  const processLineCallback = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Exchange code for LINE token
      const tokenRes = await fetch('https://api.line.me/oauth2/v2.1/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID || '',
          client_secret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET || '',
          redirect_uri: process.env.NEXT_PUBLIC_LINE_REDIRECT_URL || `${window.location.origin}/sign-in`,
        }),
      });
      const tokenData = await tokenRes.json();

      if (!tokenData.access_token) {
        setError('Token หมดอายุ กรุณาเข้าสู่ระบบใหม่');
        return false;
      }

      // Fetch LINE profile
      const profileRes = await fetch('https://api.line.me/v2/profile', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const profile = await profileRes.json();

      // Login via our backend
      const res = await service.loginWithLine({
        member_uid: profile.userId,
        member_fname: profile.displayName || '',
        member_avatar: profile.pictureUrl || '',
        member_type: 'line',
      });

      const memberData = res.data || res;
      const accessToken = res.accessToken || res.token || '';
      const mId = res.MemberID || memberData?.member_id?.toString() || '';
      const mappedUser = mapLegacyMemberToUser(memberData, mId);

      setAuth(accessToken, '', mappedUser, mId);
      return true;
    } catch (e: any) {
      setError(e?.message || 'LINE login ไม่สำเร็จ');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login with Apple ID
   */
  const loginWithApple = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await service.loginWithApple();
      const memberData = res.data || res;
      const accessToken = res.accessToken || res.token || '';
      const mId = res.MemberID || memberData?.member_id?.toString() || '';
      const mappedUser = mapLegacyMemberToUser(memberData, mId);

      setAuth(accessToken, '', mappedUser, mId);
      return true;
    } catch (e: any) {
      setError(e?.message || 'Apple login ไม่สำเร็จ');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new member
   * Maps to legacy: POST /auth/member/register-v2
   */
  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await service.register(payload);
      if (res?.status === 'success' || res?.message?.includes('success')) {
        return true;
      }
      return true;
    } catch (e: any) {
      const errMsg = e?.message || '';
      if (errMsg.includes('phone already exists')) {
        setError('เบอร์โทรศัพท์นี้มีในระบบแล้ว กรุณาเข้าสู่ระบบ');
      } else {
        setError(errMsg || 'สมัครสมาชิกไม่สำเร็จ');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send OTP for password recovery
   */
  const sendOTP = async (phone: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await service.sendOTP({ phone });
      return true;
    } catch (e: any) {
      setError(e?.message || 'ส่ง OTP ไม่สำเร็จ');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verify OTP
   */
  const verifyOTP = async (phone: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await service.verifyOTP({ phone, otp });
      return true;
    } catch (e: any) {
      setError(e?.message || 'ยืนยัน OTP ไม่สำเร็จ');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await service.forgotPassword(payload);
      return true;
    } catch (e: any) {
      setError(e?.message || 'ไม่สำเร็จ');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch fresh profile from the backend
   */
  const refreshProfile = async () => {
    try {
      const { accountService } = await import('@/services');
      const profile = await accountService.getProfile();
      if (profile) {
        const memberData = profile?.data || profile;
        const mappedUser = mapLegacyMemberToUser(memberData, memberId || '');
        setUser(mappedUser);
      }
    } catch {
      // silently fail
    }
  };

  /**
   * Check if access token is expired (JWT)
   */
  const isTokenExpired = (): boolean => {
    const { token } = useAuthStore.getState();
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp ? payload.exp < now : false;
    } catch {
      return true;
    }
  };

  const logout = async () => {
    try {
      await service.logout();
    } catch {
      // ignore logout API errors
    }
    storeLogout();
  };

  return {
    user, isAuthenticated, memberId, isLoading, error,
    isLoginModalOpen, openLoginModal, closeLoginModal,
    loginWithPhone, loginWithLine, loginWithApple,
    processLineCallback,
    register, forgotPassword, logout,
    sendOTP, verifyOTP,
    refreshProfile, isTokenExpired,
  };
}
