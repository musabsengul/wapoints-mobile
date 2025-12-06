import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';

interface BadgeProps {
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
    style?: ViewStyle;
}

export function Badge({ label, variant = 'default', style }: BadgeProps) {
    const colors = useColors();

    const styles = StyleSheet.create({
        badge: {
            paddingHorizontal: spacing.sm,
            paddingVertical: 2,
            borderRadius: borderRadius.full,
            alignSelf: 'flex-start',
        },
        text: {
            fontSize: typography.xs,
            fontWeight: '600',
        },
        // Variants
        default: {
            backgroundColor: colors.surface,
        },
        success: {
            backgroundColor: colors.success + '20', // 20% opacity
        },
        warning: {
            backgroundColor: colors.warning + '20',
        },
        error: {
            backgroundColor: colors.error + '20',
        },
        outline: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.border,
        },
        // Text Colors
        textDefault: {
            color: colors.text,
        },
        textSuccess: {
            color: colors.success,
        },
        textWarning: {
            color: colors.warning,
        },
        textError: {
            color: colors.error,
        },
        textOutline: {
            color: colors.textSecondary,
        },
    });

    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'success': return styles.success;
            case 'warning': return styles.warning;
            case 'error': return styles.error;
            case 'outline': return styles.outline;
            default: return styles.default;
        }
    };

    const getTextStyle = (): TextStyle => {
        switch (variant) {
            case 'success': return styles.textSuccess;
            case 'warning': return styles.textWarning;
            case 'error': return styles.textError;
            case 'outline': return styles.textOutline;
            default: return styles.textDefault;
        }
    };

    return (
        <View style={[styles.badge, getVariantStyle(), style]}>
            <Text style={[styles.text, getTextStyle()]}>
                {label}
            </Text>
        </View>
    );
}
