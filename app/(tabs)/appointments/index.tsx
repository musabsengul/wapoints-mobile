import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointment-service';
import { Appointment, AppointmentStatus } from '@/types/api';
import { formatAppointmentDate, formatAppointmentTime } from '@/utils/date-format';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'expo-router';
import { useColors } from '@/utils/styles';
import { getStatusColor } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';
import { useThemeStore } from '@/store/theme-store';

export default function AppointmentsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  const colors = useColors();
  const isDark = useThemeStore((state) => state.colorScheme) === 'dark';
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | 'ALL'>('ALL');

  const { data: appointments, isLoading, error, refetch } = useQuery({
    queryKey: ['appointments', selectedStatus],
    queryFn: () => appointmentService.getMyAppointments(
      selectedStatus !== 'ALL' ? { status: selectedStatus } : {}
    ),
  });

  const confirmMutation = useMutation({
    mutationFn: appointmentService.confirmAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      Alert.alert('Başarılı', 'Randevu onaylandı');
    },
    onError: (error: any) => {
      Alert.alert('Hata', error?.message || 'Randevu onaylanırken bir hata oluştu');
    },
  });

  const cancelMutation = useMutation({
    mutationFn: appointmentService.cancelAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      Alert.alert('Başarılı', 'Randevu iptal edildi');
    },
    onError: (error: any) => {
      Alert.alert('Hata', error?.message || 'Randevu iptal edilirken bir hata oluştu');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: appointmentService.rejectAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      Alert.alert('Başarılı', 'Randevu reddedildi');
    },
    onError: (error: any) => {
      Alert.alert('Hata', error?.message || 'Randevu reddedilirken bir hata oluştu');
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case 'PENDING':
        return 'Beklemede';
      case 'CONFIRMED':
        return 'Onaylandı';
      case 'CANCELLED':
        return 'İptal Edildi';
      case 'REJECTED':
        return 'Reddedildi';
      default:
        return status;
    }
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
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    title: {
      fontSize: typography['2xl'],
      fontWeight: 'bold',
      color: colors.text,
    },
    logoutButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    logoutText: {
      color: colors.error,
      fontWeight: '500',
    },
    filtersContainer: {
      flexDirection: 'row',
    },
    filterButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
    },
    filterButtonInactive: {
      backgroundColor: colors.surface,
    },
    filterText: {
      fontWeight: '500',
      fontSize: typography.sm,
    },
    filterTextActive: {
      color: '#ffffff',
    },
    filterTextInactive: {
      color: colors.text,
    },
    appointmentCard: {
      backgroundColor: colors.background,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    appointmentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.sm,
    },
    appointmentInfo: {
      flex: 1,
    },
    customerName: {
      fontSize: typography.lg,
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    serviceName: {
      fontSize: typography.base,
      color: colors.textSecondary,
    },
    statusBadge: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
    },
    statusText: {
      fontSize: typography.xs,
      fontWeight: '500',
    },
    appointmentTimeContainer: {
      marginTop: spacing.md,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    appointmentDate: {
      fontSize: typography.sm,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
    appointmentTime: {
      fontSize: typography.base,
      fontWeight: '500',
      color: colors.text,
    },
    actionsContainer: {
      flexDirection: 'row',
      marginTop: spacing.md,
    },
    actionButton: {
      flex: 1,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.sm,
      alignItems: 'center',
    },
    actionButtonGreen: {
      backgroundColor: colors.success,
    },
    actionButtonRed: {
      backgroundColor: colors.error,
    },
    actionButtonOrange: {
      backgroundColor: colors.warning,
    },
    actionButtonText: {
      color: '#ffffff',
      fontWeight: '500',
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    emptyText: {
      color: colors.textSecondary,
      textAlign: 'center',
    },
    errorContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    errorText: {
      color: colors.error,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    retryButton: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    retryButtonText: {
      color: '#ffffff',
      fontWeight: '500',
    },
    listContent: {
      padding: spacing.md,
    },
  });

  const renderAppointment = ({ item }: { item: Appointment }) => {
    const statusColor = getStatusColor(item.status, isDark);
    // Convert hex to rgba for opacity
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    
    return (
      <TouchableOpacity style={styles.appointmentCard}>
        <View style={styles.appointmentHeader}>
          <View style={styles.appointmentInfo}>
            <Text style={styles.customerName}>{item.customer_name}</Text>
            <Text style={styles.serviceName}>{item.service_name}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: hexToRgba(statusColor, 0.2) }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        <View style={styles.appointmentTimeContainer}>
          <Text style={styles.appointmentDate}>
            {formatAppointmentDate(item.start_at)}
          </Text>
          <Text style={styles.appointmentTime}>
            {formatAppointmentTime(item.start_at)} - {formatAppointmentTime(item.end_at)}
          </Text>
        </View>

        {item.status === 'PENDING' && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => confirmMutation.mutate(item.id)}
              disabled={confirmMutation.isPending}
              style={[styles.actionButton, styles.actionButtonGreen, { marginRight: spacing.xs }]}
            >
              <Text style={styles.actionButtonText}>Onayla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => rejectMutation.mutate(item.id)}
              disabled={rejectMutation.isPending}
              style={[styles.actionButton, styles.actionButtonRed, { marginRight: spacing.xs }]}
            >
              <Text style={styles.actionButtonText}>Reddet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => cancelMutation.mutate(item.id)}
              disabled={cancelMutation.isPending}
              style={[styles.actionButton, styles.actionButtonOrange]}
            >
              <Text style={styles.actionButtonText}>İptal</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const statusFilters: Array<{ label: string; value: AppointmentStatus | 'ALL' }> = [
    { label: 'Tümü', value: 'ALL' },
    { label: 'Beklemede', value: 'PENDING' },
    { label: 'Onaylandı', value: 'CONFIRMED' },
    { label: 'İptal', value: 'CANCELLED' },
  ];

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Randevular yüklenirken bir hata oluştu
        </Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Randevularım</Text>
          <TouchableOpacity
            onPress={async () => {
              await logout();
              router.replace('/(auth)/login');
            }}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Çıkış</Text>
          </TouchableOpacity>
        </View>

        {/* Status Filters */}
        <View style={styles.filtersContainer}>
          {statusFilters.map((filter, index) => (
            <TouchableOpacity
              key={filter.value}
              onPress={() => setSelectedStatus(filter.value)}
              style={[
                styles.filterButton,
                selectedStatus === filter.value
                  ? styles.filterButtonActive
                  : styles.filterButtonInactive,
                index < statusFilters.length - 1 && { marginRight: spacing.sm },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedStatus === filter.value
                    ? styles.filterTextActive
                    : styles.filterTextInactive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Appointments List */}
      {isLoading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : appointments && appointments.length > 0 ? (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz randevu bulunmuyor</Text>
        </View>
      )}
    </View>
  );
}
