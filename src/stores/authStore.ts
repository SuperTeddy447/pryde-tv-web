import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';
import { STORAGE_KEYS } from '@/lib/constants';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  memberId: string | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  setAuth: (token: string, refreshToken: string, user: User, memberId?: string) => void;
  setUser: (user: User) => void;
  setMemberId: (id: string) => void;
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
      memberId: null,
      isAuthenticated: false,
      isLoginModalOpen: false,

      setAuth: (token, refreshToken, user, memberId) => {
        // Also persist member_id to localStorage for legacy API calls
        if (typeof window !== 'undefined' && memberId) {
          localStorage.setItem('member_id', memberId);
          localStorage.setItem('access_token', token);
        }
        set({
          token,
          refreshToken,
          user,
          memberId: memberId || user.id,
          isAuthenticated: true,
          isLoginModalOpen: false,
        });
      },

      setUser: (user) => set({ user }),

      setMemberId: (id) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('member_id', id);
        }
        set({ memberId: id });
      },

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
          // Legacy keys
          localStorage.removeItem('member');
          localStorage.removeItem('member_id');
          localStorage.removeItem('access_token');
          localStorage.removeItem('external');
          localStorage.removeItem('map_system_id');
          localStorage.removeItem('WATCH_TOKEN');
        }
        set({
          token: null,
          refreshToken: null,
          user: null,
          memberId: null,
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
        memberId: state.memberId,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
