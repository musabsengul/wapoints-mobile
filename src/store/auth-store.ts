import { create } from 'zustand';
import { User, Resource } from '@/types/api';
import { SecureStoreService } from '@/utils/secure-store';
import { authService } from '@/services/auth-service';
import { LoginRequest } from '@/types/api';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: User | null;
  resource: Resource | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  token: null,
  user: null,
  resource: null,

  login: async (credentials: LoginRequest) => {
    try {
      set({ isLoading: true });
      const response = await authService.login(credentials);
      
      // Save to secure store
      await SecureStoreService.saveToken(response.access_token);
      await SecureStoreService.saveUser(JSON.stringify(response.user));
      await SecureStoreService.saveResource(JSON.stringify(response.resource));

      // Update state
      set({
        isAuthenticated: true,
        token: response.access_token,
        user: response.user,
        resource: response.resource,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await SecureStoreService.clearAll();
    set({
      isAuthenticated: false,
      token: null,
      user: null,
      resource: null,
      isLoading: false,
    });
  },

  initialize: async () => {
    try {
      const token = await SecureStoreService.getToken();
      const userStr = await SecureStoreService.getUser();
      const resourceStr = await SecureStoreService.getResource();

      if (token && userStr && resourceStr) {
        const user = JSON.parse(userStr) as User;
        const resource = JSON.parse(resourceStr) as Resource;

        set({
          isAuthenticated: true,
          token,
          user,
          resource,
          isLoading: false,
        });
      } else {
        set({
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));

