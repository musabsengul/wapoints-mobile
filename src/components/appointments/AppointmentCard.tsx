import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Appointment } from '@/types/api';
import { formatAppointmentTime } from '@/utils/date-format';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';

interface AppointmentCardProps {
    appointment: Appointment;
    onPress?: () => void;
}

export function AppointmentCard({ appointment, onPress }: AppointmentCardProps) {
    const colors = useColors();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return colors.success; // Emerald
            case 'PENDING': return colors.warning; // Amber
            case 'CANCELLED': return colors.textSecondary; // Gray
            case 'REJECTED': return colors.error; // Red
            default: return colors.primary;
        }
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.surface,
            borderRadius: borderRadius.lg,
            padding: spacing.md,
            borderLeftWidth: 4,
            borderLeftColor: getStatusColor(appointment.status),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
            marginBottom: spacing.sm,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: spacing.xs,
        },
        customerName: {
            fontSize: typography.base,
            fontWeight: '600',
            color: colors.text,
        },
        serviceName: {
            fontSize: typography.sm,
            color: colors.textSecondary,
            marginBottom: spacing.xs,
        },
        time: {
            fontSize: typography.xs,
            fontWeight: '500',
            color: colors.textSecondary,
        },
    });

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.header}>
                <Text style={styles.customerName}>{appointment.customer_name}</Text>
            </View>
            <Text style={styles.serviceName}>{appointment.service_name}</Text>
            <Text style={styles.time}>
                {formatAppointmentTime(appointment.start_at)} - {formatAppointmentTime(appointment.end_at)}
            </Text>
        </TouchableOpacity>
    );
}
