import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';
import { format, addDays, startOfWeek } from 'date-fns';
import { tr } from 'date-fns/locale';

interface DateNavigatorProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

export function DateNavigator({ selectedDate, onSelectDate }: DateNavigatorProps) {
    const colors = useColors();
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start from Monday
    const dates = Array.from({ length: 14 }).map((_, i) => addDays(startDate, i));

    const styles = StyleSheet.create({
        container: {
            paddingVertical: spacing.md,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        scrollContent: {
            paddingHorizontal: spacing.md,
        },
        dateItem: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
            borderRadius: borderRadius.xl,
            marginRight: spacing.sm,
            borderWidth: 1,
            borderColor: 'transparent',
        },
        selectedDateItem: {
            backgroundColor: colors.primary + '10', // 10% opacity
            borderColor: colors.primary,
        },
        dayName: {
            fontSize: typography.xs,
            color: colors.textSecondary,
            marginBottom: 2,
            fontWeight: '500',
        },
        selectedDayName: {
            color: colors.primary,
        },
        dayNumber: {
            fontSize: typography.lg,
            fontWeight: '600',
            color: colors.text,
        },
        selectedDayNumber: {
            color: colors.primary,
        },
    });

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {dates.map((date) => {
                    const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                    return (
                        <TouchableOpacity
                            key={date.toISOString()}
                            style={[styles.dateItem, isSelected && styles.selectedDateItem]}
                            onPress={() => onSelectDate(date)}
                        >
                            <Text style={[styles.dayName, isSelected && styles.selectedDayName]}>
                                {format(date, 'EEE', { locale: tr })}
                            </Text>
                            <Text style={[styles.dayNumber, isSelected && styles.selectedDayNumber]}>
                                {format(date, 'd')}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}
