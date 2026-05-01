import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';
import { STORAGE_KEYS } from '@/lib/constants';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  setAuth: (token: string, refreshToken: string, user: User) => void;
  setUser: (user: User) => void;
  updateCoinBalance: (balance: number) => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoginModalOpen: false,

      setAuth: (token, refreshToken, user) =>
        set({
          token,
          refreshToken,
          user,
          isAuthenticated: true,
          isLoginModalOpen: false,
        }),

      setUser: (user) => set({ user }),

      updateCoinBalance: (balance) =>
        set((state) => ({
          user: state.user ? { ...state.user, coinBalance: balance } : null,
        })),

      openLoginModal: () => set({ isLoginModalOpen: true }),
      closeLoginModal: () => set({ isLoginModalOpen: false }),

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
        }
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'pryde-auth-storage',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
