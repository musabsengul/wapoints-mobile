import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointment-service';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { RequestCard } from '@/components/appointments/RequestCard';
import { H1, Body } from '@/components/ui/Typography';
import { useColors } from '@/utils/styles';
import { spacing } from '@/config/theme';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

export default function PendingRequestsScreen() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const colors = useColors();

    const { data: appointments, isLoading } = useQuery({
        queryKey: ['appointments', 'PENDING'],
        queryFn: () => appointmentService.getMyAppointments({ status: 'PENDING' }),
    });

    const confirmMutation = useMutation({
        mutationFn: appointmentService.confirmAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        },
    });

    const rejectMutation = useMutation({
        mutationFn: appointmentService.rejectAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        },
    });

    const styles = StyleSheet.create({
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
        listContent: {
            paddingBottom: spacing.xl,
        },
        emptyContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: spacing.xxl,
        },
        emptyText: {
            color: colors.textSecondary,
            textAlign: 'center',
        },
    });

    return (
        <ScreenLayout>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft color={colors.text} size={24} />
                </TouchableOpacity>
                <H1 style={styles.title}>Bekleyen Talepler</H1>
            </View>

            <FlatList
                data={appointments}
                renderItem={({ item }) => (
                    <RequestCard
                        appointment={item}
                        onConfirm={(id) => confirmMutation.mutate(id)}
                        onReject={(id) => rejectMutation.mutate(id)}
                        isConfirming={confirmMutation.isPending && confirmMutation.variables === item.id}
                        isRejecting={rejectMutation.isPending && rejectMutation.variables === item.id}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Body style={styles.emptyText}>Bekleyen randevu talebi bulunmuyor.</Body>
                    </View>
                }
            />
        </ScreenLayout>
    );
}
