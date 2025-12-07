import { View, Alert, Switch, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useThemeStore } from '@/store/theme-store';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { H2, Body, Caption } from '@/components/ui/Typography';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';
import { User, MapPin, Moon, LogOut, ChevronRight, Bell, Copy, Check } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { getFCMToken } from '@/utils/notifications';
import { Platform } from 'react-native';
import { getMessaging, getAPNSToken } from '@react-native-firebase/messaging';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, resource, logout } = useAuthStore();
  const { colorScheme, toggleTheme } = useThemeStore();
  const isDark = colorScheme === 'dark';
  const colors = useColors();
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [apnsToken, setApnsToken] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [copiedToken, setCopiedToken] = useState<'fcm' | 'apns' | null>(null);

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    try {
      const token = await getFCMToken();
    
      console.log('FCM Token:', token);
      setFcmToken(token);
      
      if (Platform.OS === 'ios') {
        try {
          const messaging = getMessaging();
          const apns = await getAPNSToken(messaging);
          setApnsToken(apns);
        } catch (error) {
          console.error('Error getting APNs token:', error);
        }
      }
    } catch (error) {
      console.error('Error checking notification status:', error);
    }
  };

  const copyToClipboard = async (text: string, type: 'fcm' | 'apns') => {
    try {
      await Clipboard.setStringAsync(text);
      setCopiedToken(type);
      Alert.alert('✅ Kopyalandı', `${type === 'fcm' ? 'FCM' : 'APNs'} token panoya kopyalandı`);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      Alert.alert('❌ Hata', 'Token kopyalanamadı');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      paddingVertical: spacing.xl,
      marginBottom: spacing.md,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    avatarText: {
      fontSize: 40,
      fontWeight: '600',
      color: colors.primary,
    },
    userName: {
      marginBottom: 4,
      textAlign: 'center',
    },
    userEmail: {
      textAlign: 'center',
    },
    section: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius['2xl'],
      overflow: 'hidden',
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: borderRadius.md,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    rowContent: {
      flex: 1,
    },
    rowLabel: {
      fontSize: typography.sm,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    rowValue: {
      fontSize: typography.base,
      fontWeight: '500',
      color: colors.text,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.md,
      marginTop: spacing.xl,
    },
    logoutText: {
      color: colors.error,
      fontWeight: '600',
      fontSize: typography.base,
      marginLeft: spacing.sm,
    },
  });

  return (
    <ScreenLayout style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <H2 style={styles.userName}>{user?.full_name || 'Kullanıcı'}</H2>
          <Caption style={styles.userEmail}>{user?.email}</Caption>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <User size={18} color={colors.text} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Personel Adı</Text>
              <Text style={styles.rowValue}>{resource?.name || '-'}</Text>
            </View>
          </View>
          <View style={[styles.row, styles.lastRow]}>
            <View style={styles.iconContainer}>
              <MapPin size={18} color={colors.text} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Lokasyon</Text>
              <Text style={styles.rowValue}>{resource?.location || '-'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.row, styles.lastRow, styles.settingRow]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.iconContainer}>
                <Moon size={18} color={colors.text} />
              </View>
              <Body>Karanlık Mod</Body>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={'#ffffff'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.row, styles.lastRow]}
            onPress={() => setShowDebug(!showDebug)}
          >
            <View style={styles.iconContainer}>
              <Bell size={18} color={colors.text} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Push Notification Debug</Text>
              <Text style={styles.rowValue}>{showDebug ? 'Gizle' : 'Göster'}</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {showDebug && (
          <View style={styles.section}>
            <View style={styles.row}>
              <View style={[styles.rowContent, { flex: 1 }]}>
                <Text style={styles.rowLabel}>FCM Token</Text>
                <Text style={[styles.rowValue, { fontSize: 10 }]} numberOfLines={2}>
                  {fcmToken || 'Yükleniyor...'}
                </Text>
              </View>
              {fcmToken && (
                <TouchableOpacity
                  style={[styles.iconContainer, { marginLeft: spacing.sm }]}
                  onPress={() => copyToClipboard(fcmToken, 'fcm')}
                >
                  {copiedToken === 'fcm' ? (
                    <Check size={18} color={colors.success} />
                  ) : (
                    <Copy size={18} color={colors.text} />
                  )}
                </TouchableOpacity>
              )}
            </View>
            {Platform.OS === 'ios' && (
              <View style={[styles.row, styles.lastRow]}>
                <View style={[styles.rowContent, { flex: 1 }]}>
                  <Text style={styles.rowLabel}>APNs Token</Text>
                  <Text style={[styles.rowValue, { fontSize: 10, color: apnsToken ? colors.success : colors.error }]}>
                    {apnsToken ? apnsToken : '⚠️ APNs Token yok - Push notification çalışmayabilir'}
                  </Text>
                  {!apnsToken && (
                    <Caption style={{ marginTop: 4, color: colors.error }}>
                      • Fiziksel cihaz kullanın (Simulator çalışmaz){'\n'}
                      • Firebase Console'da APNs sertifikalarını kontrol edin
                    </Caption>
                  )}
                </View>
                {apnsToken && (
                  <TouchableOpacity
                    style={[styles.iconContainer, { marginLeft: spacing.sm }]}
                    onPress={() => copyToClipboard(apnsToken, 'apns')}
                  >
                    {copiedToken === 'apns' ? (
                      <Check size={18} color={colors.success} />
                    ) : (
                      <Copy size={18} color={colors.text} />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenLayout>
  );
}
