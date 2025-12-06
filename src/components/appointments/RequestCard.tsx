import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appointment } from '@/types/api';
import { formatAppointmentDate, formatAppointmentTime } from '@/utils/date-format';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface RequestCardProps {
    appointment: Appointment;
    onConfirm: (id: string) => void;
    onReject: (id: string) => void;
    isConfirming?: boolean;
    isRejecting?: boolean;
}

export function RequestCard({
    appointment,
    onConfirm,
    onReject,
    isConfirming,
    isRejecting
}: RequestCardProps) {
    const colors = useColors();

    const styles = StyleSheet.create({
        container: {
            marginBottom: spacing.md,
        },
        header: {
            marginBottom: spacing.sm,
        },
        customerName: {
            fontSize: typography.base,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 2,
        },
        serviceName: {
            fontSize: typography.sm,
            color: colors.textSecondary,
        },
        timeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: spacing.md,
            paddingVertical: spacing.xs,
            paddingHorizontal: spacing.sm,
            backgroundColor: colors.background,
            borderRadius: borderRadius.md,
            alignSelf: 'flex-start',
        },
        timeText: {
            fontSize: typography.sm,
            fontWeight: '500',
            color: colors.text,
        },
        actions: {
            flexDirection: 'row',
            gap: spacing.md,
        },
        button: {
            flex: 1,
        },
    });

    return (
        <Card style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.customerName}>{appointment.customer_name}</Text>
                <Text style={styles.serviceName}>{appointment.service_name}</Text>
            </View>

            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                    {formatAppointmentDate(appointment.start_at)} • {formatAppointmentTime(appointment.start_at)} - {formatAppointmentTime(appointment.end_at)}
                </Text>
            </View>

            <View style={styles.actions}>
                <Button
                    label="Reddet"
                    variant="outline"
                    size="sm"
                    style={styles.button}
                    onPress={() => onReject(appointment.id)}
                    loading={isRejecting}
                />
                <Button
                    label="Onayla"
                    variant="primary"
                    size="sm"
                    style={styles.button}
                    onPress={() => onConfirm(appointment.id)}
                    loading={isConfirming}
                />
            </View>
        </Card>
    );
}
