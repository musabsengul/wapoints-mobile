import { View, Alert, Switch, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useThemeStore } from '@/store/theme-store';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { H2, Body, Caption } from '@/components/ui/Typography';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';
import { User, MapPin, Moon, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, resource, logout } = useAuthStore();
  const { colorScheme, toggleTheme } = useThemeStore();
  const isDark = colorScheme === 'dark';
  const colors = useColors();

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

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenLayout>
  );
}
