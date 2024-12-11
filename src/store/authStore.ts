import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';
import { authService } from '../services/authService';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      setUser: (user: User) => set({ user, isAuthenticated: true }),
      setToken: (token: string) => set({ token }),
      login: async (email: string, password: string) => {
        try {
          const { user, token } = await authService.login({ email, password });
          set({ user, token, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          console.error('Login failed:', error);
          return { success: false, error };
        }
      },
      logout: () => {
        authService.logout();
        set({ isAuthenticated: false, user: null, token: null });
      },
      clearAuth: () => set({ isAuthenticated: false, user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);