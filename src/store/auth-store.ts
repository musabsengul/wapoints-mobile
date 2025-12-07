import { create } from 'zustand';
import { User, Resource } from '@/types/api';
import { SecureStoreService } from '@/utils/secure-store';
import { authService } from '@/services/auth-service';
import { fcmService } from '@/services/fcm-service';
import { LoginRequest } from '@/types/api';
import { getFCMToken, deleteFCMToken } from '@/utils/notifications';
import { Platform } from 'react-native';

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

      // Register FCM token after successful login
      try {
        const fcmToken = await getFCMToken();
        if (fcmToken) {
          console.log('📱 FCM Token alındı:', fcmToken);
          console.log('📤 Backend\'e gönderiliyor...');
          await fcmService.registerToken({
            token: fcmToken,
            device_type: Platform.OS === 'ios' ? 'ios' : Platform.OS === 'android' ? 'android' : 'web',
          });
          console.log('✅ FCM Token backend\'e başarıyla kaydedildi');
        } else {
          console.warn('⚠️ FCM Token alınamadı');
        }
      } catch (fcmError) {
        console.error('❌ FCM token kayıt hatası:', fcmError);
        // Don't throw - FCM registration failure shouldn't block login
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      // Get FCM token before clearing storage
      const fcmToken = await getFCMToken();

      // Delete FCM token from backend if token exists
      if (fcmToken) {
        try {
          await fcmService.deleteToken({ token: fcmToken });
        } catch (error) {
          console.error('Error deleting FCM token from backend:', error);
        }

        // Delete FCM token from device
        try {
          await deleteFCMToken();
        } catch (error) {
          console.error('Error deleting FCM token from device:', error);
        }
      }

      // Call logout endpoint with FCM token
      try {
        await authService.logout(fcmToken ? { fcm_token: fcmToken } : undefined);
      } catch (error) {
        console.error('Error calling logout endpoint:', error);
        // Continue with local logout even if API call fails
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear local storage and state
      await SecureStoreService.clearAll();
      set({
        isAuthenticated: false,
        token: null,
        user: null,
        resource: null,
        isLoading: false,
      });
    }
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

