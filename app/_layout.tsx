import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryProvider } from '@/providers/query-provider';
import { useAuthStore } from '@/store/auth-store';
import { useThemeStore } from '@/store/theme-store';
import { requestNotificationPermissions, setupNotificationListeners } from '@/utils/notifications';
import { StatusBar } from 'expo-status-bar';
import messaging from '@react-native-firebase/messaging';
import { getMessaging, getInitialNotification } from '@react-native-firebase/messaging';

// Register background message handler (must be at root level, outside React lifecycle)
// Note: setBackgroundMessageHandler still uses the old API
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('🔔 ========== BACKGROUND NOTIFICATION RECEIVED ==========');
  console.log('🔔 Full message:', JSON.stringify(remoteMessage, null, 2));
  console.log('🔔 Message ID:', remoteMessage.messageId);
  console.log('🔔 Notification title:', remoteMessage.notification?.title);
  console.log('🔔 Notification body:', remoteMessage.notification?.body);
  console.log('🔔 Data:', remoteMessage.data);
  console.log('🔔 From:', remoteMessage.from);
  console.log('🔔 Sent time:', remoteMessage.sentTime);
  console.log('🔔 ====================================================');
  // Background'da bildirim otomatik gösterilir, burada sadece log basıyoruz
});

export default function RootLayout() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const colorScheme = useThemeStore((state) => state.colorScheme);

  useEffect(() => {
    // Initialize auth state from secure store
    initializeAuth();

    // Initialize theme
    useThemeStore.getState().initialize();

    // Request notification permissions and setup listeners
    const setupNotifications = async () => {
      const granted = await requestNotificationPermissions();
      if (granted) {
        setupNotificationListeners();
        
        // Check if app was opened from a notification (additional check)
        const messagingInstance = getMessaging();
        getInitialNotification(messagingInstance)
          .then((remoteMessage) => {
            if (remoteMessage) {
              console.log('🔔 App opened from notification (on mount):', JSON.stringify(remoteMessage, null, 2));
            }
          });
      } else {
        console.error('❌ Notification permissions not granted');
      }
    };
    
    setupNotifications();
  }, []);

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

