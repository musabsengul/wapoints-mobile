import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryProvider } from '@/providers/query-provider';
import { useAuthStore } from '@/store/auth-store';
import { useThemeStore } from '@/store/theme-store';
import { requestNotificationPermissions, setupNotificationListeners } from '@/utils/notifications';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const colorScheme = useThemeStore((state) => state.colorScheme);

  useEffect(() => {
    // Initialize auth state from secure store
    initializeAuth();

    // Initialize theme
    useThemeStore.getState().initialize();

    // Request notification permissions
    requestNotificationPermissions().then((granted: boolean) => {
      if (granted) {
        setupNotificationListeners();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <QueryProvider>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#ffffff' },
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryProvider>
  );
}
