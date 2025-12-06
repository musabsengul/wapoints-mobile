import { View, Text, StyleSheet, Alert, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointment-service';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { Button } from '@/components/ui/Button';
import { H1, H2, Body, Caption } from '@/components/ui/Typography';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';
import { formatAppointmentDate, formatAppointmentTime } from '@/utils/date-format';
import { ArrowLeft, Calendar, Clock, User, Scissors, MapPin } from 'lucide-react-native';
import { Badge } from '@/components/ui/Badge';

export default function AppointmentDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const queryClient = useQueryClient();
    const colors = useColors();

    const { data: appointment, isLoading, error } = useQuery({
        queryKey: ['appointment', id],
        queryFn: () => appointmentService.getAppointment(id!),
        enabled: !!id,
    });

    const cancelMutation = useMutation({
        mutationFn: appointmentService.cancelAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
            queryClient.invalidateQueries({ queryKey: ['appointment', id] });
            Alert.alert('Başarılı', 'Randevu iptal edildi.');
        },
        onError: (error: any) => {
            Alert.alert('Hata', error?.message || 'Randevu iptal edilirken bir hata oluştu.');
        },
    });

    const handleCancel = () => {
        Alert.alert(
            'Randevuyu İptal Et',
            'Bu randevuyu iptal etmek istediğinize emin misiniz?',
            [
                { text: 'Vazgeç', style: 'cancel' },
                {
                    text: 'İptal Et',
                    style: 'destructive',
                    onPress: () => cancelMutation.mutate(id!),
                },
            ]
        );
    };

    const styles = StyleSheet.create({
        loadingContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: spacing.lg,
            marginTop: spacing.sm,
        },
        backButton: {
            marginRight: spacing.md,
            padding: spacing.xs,
        },
        title: {
            flex: 1,
        },
        section: {
            backgroundColor: colors.surface,
            borderRadius: borderRadius['2xl'],
            padding: spacing.lg,
            marginBottom: spacing.lg,
            borderWidth: 1,
            borderColor: colors.border,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: spacing.md,
        },
        iconContainer: {
            width: 40,
            height: 40,
            borderRadius: borderRadius.md,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
        },
        label: {
            fontSize: typography.sm,
            color: colors.textSecondary,
            marginBottom: 2,
        },
        value: {
            fontSize: typography.base,
            fontWeight: '500',
            color: colors.text,
        },
        statusContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacing.lg,
        },
        cancelButton: {
            marginTop: spacing.xl,
        },
    });

    if (isLoading) {
        return (
            <ScreenLayout style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </ScreenLayout>
        );
    }

    if (error || !appointment) {
        return (
            <ScreenLayout style={styles.loadingContainer}>
                <Body>Randevu bulunamadı.</Body>
                <Button label="Geri Dön" onPress={() => router.back()} variant="ghost" style={{ marginTop: spacing.md }} />
            </ScreenLayout>
        );
    }

    const isCancellable = appointment.status === 'PENDING' || appointment.status === 'CONFIRMED';

    return (
        <ScreenLayout>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ArrowLeft color={colors.text} size={24} />
                    </TouchableOpacity>
                    <H1 style={styles.title}>Randevu Detayı</H1>
                </View>

                <View style={styles.statusContainer}>
                    <H2>Durum</H2>
                    <Badge
                        label={appointment.status === 'CONFIRMED' ? 'Onaylandı' :
                            appointment.status === 'PENDING' ? 'Beklemede' :
                                appointment.status === 'CANCELLED' ? 'İptal Edildi' :
                                    appointment.status === 'REJECTED' ? 'Reddedildi' : appointment.status}
                        variant={appointment.status === 'CONFIRMED' ? 'success' : 'default'}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <User size={20} color={colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.label}>Müşteri</Text>
                            <Text style={styles.value}>{appointment.customer_name}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <Scissors size={20} color={colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.label}>Hizmet</Text>
                            <Text style={styles.value}>{appointment.service_name}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <Calendar size={20} color={colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.label}>Tarih</Text>
                            <Text style={styles.value}>{formatAppointmentDate(appointment.start_at)}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.iconContainer}>
                            <Clock size={20} color={colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.label}>Saat</Text>
                            <Text style={styles.value}>
                                {formatAppointmentTime(appointment.start_at)} - {formatAppointmentTime(appointment.end_at)}
                            </Text>
                        </View>
                    </View>
                </View>

                {isCancellable && (
                    <Button
                        label="Randevuyu İptal Et"
                        variant="destructive"
                        onPress={handleCancel}
                        loading={cancelMutation.isPending}
                        style={styles.cancelButton}
                    />
                )}
            </ScrollView>
        </ScreenLayout>
    );
}
