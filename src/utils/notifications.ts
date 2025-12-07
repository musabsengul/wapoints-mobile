import {
  getMessaging,
  requestPermission,
  getToken,
  getAPNSToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  registerDeviceForRemoteMessages,
  deleteToken,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configure notification behavior for foreground
Notifications.setNotificationHandler({
  handleNotification: async (notification) => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const iosPermissions = {
  alert: true,
  badge: true,
  sound: true,
};

export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    const messaging = getMessaging();
    
    // Request Firebase Messaging permissions
    const authStatus = await requestPermission(messaging, iosPermissions);
    console.log('📱 Notification permission status:', authStatus);
    console.log('📱 AUTHORIZED:', AuthorizationStatus.AUTHORIZED);
    console.log('📱 PROVISIONAL:', AuthorizationStatus.PROVISIONAL);
    
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.warn('⚠️ Firebase Messaging permission not granted. Status:', authStatus);
      return false;
    }
    
    console.log('✅ Notification permissions granted');

    // Configure notification channel for Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

export const getFCMToken = async (): Promise<string | null> => {
  try {
    const messaging = getMessaging();
    
    // iOS'ta önce device'ı remote messages için kaydetmeliyiz
    if (Platform.OS === 'ios') {
      try {
        await registerDeviceForRemoteMessages(messaging);
        console.log('✅ Device registered for remote messages');
      } catch (registerError) {
        console.error('❌ Error registering device for remote messages:', registerError);
        // Devam et, token almaya çalışalım
      }
    }
    
    // Get the token
    const token = await getToken(messaging);
    console.log('📱 FCM Token retrieved:', token);
    
    // Check if APNs token is available (iOS only)
    if (Platform.OS === 'ios') {
      try {
        const apnsToken = await getAPNSToken(messaging);
        if (apnsToken) {
          console.log('✅ APNs Token available:', apnsToken);
        } else {
          console.warn('⚠️ APNs Token is not available. This might prevent push notifications on iOS.');
          console.warn('⚠️ Make sure:');
          console.warn('   1. App is running on a physical device (not simulator)');
          console.warn('   2. APNs certificates are configured in Firebase Console');
          console.warn('   3. App has notification permissions');
        }
      } catch (apnsError) {
        console.error('❌ Error getting APNs token:', apnsError);
      }
    }
    
    return token;
  } catch (error) {
    console.error('❌ Error getting FCM token:', error);
    return null;
  }
};

export const deleteFCMToken = async (): Promise<void> => {
  try {
    const messaging = getMessaging();
    await deleteToken(messaging);
  } catch (error) {
    console.error('Error deleting FCM token:', error);
  }
};

// Setup Firebase Messaging notification handlers
export const setupNotificationListeners = () => {
  console.log('🔔 Setting up notification listeners...');
  
  const messaging = getMessaging();
  
  // Foreground message handler
  const unsubscribeForeground = onMessage(messaging, async (remoteMessage) => {
    console.log('🔔 ========== FOREGROUND NOTIFICATION RECEIVED ==========');
    console.log('🔔 Full message:', JSON.stringify(remoteMessage, null, 2));
    console.log('🔔 Message ID:', remoteMessage.messageId);
    console.log('🔔 Notification title:', remoteMessage.notification?.title);
    console.log('🔔 Notification body:', remoteMessage.notification?.body);
    console.log('🔔 Data:', remoteMessage.data);
    console.log('🔔 From:', remoteMessage.from);
    console.log('🔔 Sent time:', remoteMessage.sentTime);
    console.log('🔔 ====================================================');

    // Show local notification when app is in foreground
    if (remoteMessage.notification) {
      console.log('📱 Showing local notification:', {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      });
      
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: remoteMessage.notification.title || 'Notification',
            body: remoteMessage.notification.body || '',
            data: remoteMessage.data || {},
            sound: true,
            badge: 1,
          },
          trigger: null,
        });
        console.log('✅ Local notification scheduled successfully');
      } catch (error) {
        console.error('❌ Error scheduling local notification:', error);
      }
    } else {
      console.warn('⚠️ Remote message has no notification payload - only data payload');
      console.warn('⚠️ iOS requires notification payload to display notification');
    }
  });

  // Note: Background message handler must be registered at app root level (app/_layout.tsx)

  // Notification opened handler (app was opened from a notification)
  const unsubscribeNotificationOpened = onNotificationOpenedApp(messaging, (remoteMessage) => {
    console.log('🔔 Notification opened app:', JSON.stringify(remoteMessage, null, 2));
    // Handle navigation or other actions here
  });

  // Check if app was opened from a notification (when app was closed)
  getInitialNotification(messaging)
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('🔔 App opened from notification:', JSON.stringify(remoteMessage, null, 2));
        // Handle navigation or other actions here
      } else {
        console.log('ℹ️ App was not opened from a notification');
      }
    })
    .catch((error) => {
      console.error('❌ Error getting initial notification:', error);
    });
  
  console.log('✅ Notification listeners set up successfully');

  // Return cleanup function
  return () => {
    unsubscribeForeground();
    unsubscribeNotificationOpened();
  };
};

