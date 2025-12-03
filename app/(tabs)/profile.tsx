import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, resource, logout } = useAuthStore();
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
      backgroundColor: colors.surface,
    },
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: typography['2xl'],
      fontWeight: 'bold',
      color: colors.text,
    },
    profileCard: {
      backgroundColor: colors.background,
      marginTop: spacing.md,
      marginHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    profileHeader: {
      marginBottom: spacing.lg,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
    },
    avatarText: {
      color: '#ffffff',
      fontSize: typography['2xl'],
      fontWeight: 'bold',
    },
    userName: {
      fontSize: typography['2xl'],
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    userEmail: {
      fontSize: typography.base,
      color: colors.textSecondary,
    },
    profileDetails: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: spacing.md,
    },
    detailItem: {
      marginBottom: spacing.md,
    },
    detailLabel: {
      fontSize: typography.sm,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
    detailValue: {
      fontSize: typography.base,
      fontWeight: '500',
      color: colors.text,
    },
    logoutContainer: {
      marginTop: 'auto',
      marginBottom: spacing.lg,
      marginHorizontal: spacing.md,
    },
    logoutButton: {
      backgroundColor: colors.error,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
    },
    logoutButtonText: {
      color: '#ffffff',
      fontWeight: '600',
      fontSize: typography.lg,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.full_name || 'Kullanıcı'}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
        </View>

        <View style={styles.profileDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Personel Adı</Text>
            <Text style={styles.detailValue}>{resource?.name || '-'}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Lokasyon</Text>
            <Text style={styles.detailValue}>{resource?.location || '-'}</Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
