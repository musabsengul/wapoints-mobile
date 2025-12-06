import { useState, useMemo } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { appointmentService } from '@/services/appointment-service';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { DateNavigator } from '@/components/appointments/DateNavigator';
import { TimelineSlot } from '@/components/appointments/TimelineSlot';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { useColors } from '@/utils/styles';
import { format, parseISO, getHours, startOfDay, isSameDay } from 'date-fns';
import { Bell, Plus } from 'lucide-react-native';
import { spacing, borderRadius, typography } from '@/config/theme';

export default function AppointmentsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const colors = useColors();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const { data: appointments, isLoading, refetch } = useQuery({
    queryKey: ['appointments'], // Fetch all for now, filtering client-side for demo
    queryFn: () => appointmentService.getMyAppointments({}),
  });

  const pendingCount = useMemo(() => {
    return appointments?.filter(apt => apt.status === 'PENDING').length || 0;
  }, [appointments]);


  console.log("appointments:", appointments);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Filter appointments by selected date
  const dailyAppointments = useMemo(() => {
    if (!appointments) return [];
    return appointments.filter(apt => isSameDay(parseISO(apt.start_at), selectedDate));
  }, [appointments, selectedDate]);

  // Group appointments by hour
  const appointmentsByHour = useMemo(() => {
    const groups: Record<number, typeof dailyAppointments> = {};
    dailyAppointments.forEach(apt => {
      const hour = getHours(parseISO(apt.start_at));
      if (!groups[hour]) groups[hour] = [];
      groups[hour].push(apt);
    });
    return groups;
  }, [dailyAppointments]);

  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 08:00 to 20:00

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
      backgroundColor: colors.surface,
    },
    headerTitle: {
      fontSize: typography.xl,
      fontWeight: 'bold',
      color: colors.text,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    iconButton: {
      padding: spacing.xs,
    },
    badge: {
      position: 'absolute',
      top: -2,
      right: -2,
      backgroundColor: colors.error,
      borderRadius: borderRadius.full,
      minWidth: 16,
      height: 16,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 2,
    },
    badgeText: {
      color: '#ffffff',
      fontSize: 10,
      fontWeight: 'bold',
    },
    timeline: {
      flex: 1,
    },
    timelineContent: {
      paddingBottom: 40 + insets.bottom, // Add safe area to bottom padding
    },
  });

  return (
    <ScreenLayout withSafeArea={false} style={styles.container}>
      <View style={{ paddingTop: insets.top, backgroundColor: colors.surface }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Takvim</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/appointments/requests')}
            >
              <Bell color={colors.text} size={24} />
              {pendingCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{pendingCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/appointments/create')}
            >
              <Plus color={colors.primary} size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <DateNavigator
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </View>

      <ScrollView
        style={styles.timeline}
        contentContainerStyle={styles.timelineContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {hours.map(hour => (
          <TimelineSlot key={hour} time={`${hour.toString().padStart(2, '0')}:00`}>
            {appointmentsByHour[hour]?.map(apt => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                onPress={() => router.push(`/appointments/${apt.id}`)}
              />
            ))}
          </TimelineSlot>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}
