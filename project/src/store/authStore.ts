import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, LoginFormData, User } from '../types/auth';
import { config } from '../config/env';
import { ADMIN_USER } from '../config/initialData';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials: LoginFormData) => {
        try {
          // Check for admin credentials
          if (
            credentials.email === ADMIN_USER.email &&
            credentials.password === ADMIN_USER.password
          ) {
            const token = 'admin-token'; // In a real app, this would be a JWT
            set({
              user: {
                id: ADMIN_USER.id,
                email: ADMIN_USER.email,
                name: ADMIN_USER.name,
                role: ADMIN_USER.role,
              },
              token,
              isAuthenticated: true,
            });
            return;
          }

          // For other users, proceed with API call
          const response = await fetch(`${config.api.baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            throw new Error('Invalid credentials');
          }

          const { user, token } = await response.json();
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);