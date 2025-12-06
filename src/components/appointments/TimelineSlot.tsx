import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/utils/styles';
import { spacing, typography } from '@/config/theme';

interface TimelineSlotProps {
    time: string;
    children?: React.ReactNode;
}

export function TimelineSlot({ time, children }: TimelineSlotProps) {
    const colors = useColors();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            minHeight: 100, // Minimum height for a slot
        },
        timeColumn: {
            width: 60,
            alignItems: 'center',
            paddingTop: spacing.md,
        },
        timeText: {
            fontSize: typography.sm,
            color: colors.textSecondary,
            fontWeight: '500',
        },
        contentColumn: {
            flex: 1,
            padding: spacing.sm,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            borderLeftWidth: 1,
            borderLeftColor: colors.border,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.timeColumn}>
                <Text style={styles.timeText}>{time}</Text>
            </View>
            <View style={styles.contentColumn}>
                {children}
            </View>
        </View>
    );
}
