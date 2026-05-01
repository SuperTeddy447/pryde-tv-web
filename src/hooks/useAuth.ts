import { useAuthStore } from '@/stores/authStore';
import { getAuthService } from '@/services/adapters/authService';
import type { LoginWithPhonePayload, RegisterPayload, ForgotPasswordPayload } from '@/types/auth';
import { useState } from 'react';

export function useAuth() {
  const { user, isAuthenticated, setAuth, logout: storeLogout, openLoginModal, closeLoginModal, isLoginModalOpen } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const service = getAuthService();

  const loginWithPhone = async (payload: LoginWithPhonePayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await service.loginWithPhone(payload);
      setAuth(res.token, res.refreshToken, res.user);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithLine = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await service.loginWithLine();
      setAuth(res.token, res.refreshToken, res.user);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'LINE login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await service.loginWithApple();
      setAuth(res.token, res.refreshToken, res.user);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Apple login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await service.register(payload);
      setAuth(res.token, res.refreshToken, res.user);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed');
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
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await service.logout();
    storeLogout();
  };

  return {
    user, isAuthenticated, isLoading, error,
    isLoginModalOpen, openLoginModal, closeLoginModal,
    loginWithPhone, loginWithLine, loginWithApple,
    register, forgotPassword, logout,
  };
}
