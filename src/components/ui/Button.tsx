import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    label: string;
    icon?: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    label,
    icon,
    style,
    disabled,
    ...props
}: ButtonProps) {
    const colors = useColors();

    const styles = StyleSheet.create({
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: borderRadius['2xl'], // Updated to 2xl
        },
        // Variants
        primary: {
            backgroundColor: colors.primary,
        },
        secondary: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
        },
        outline: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.border,
        },
        ghost: {
            backgroundColor: 'transparent',
        },
        destructive: {
            backgroundColor: colors.error,
        },
        // Sizes
        sm: {
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
        },
        md: {
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.md,
        },
        lg: {
            paddingHorizontal: spacing.xxl,
            paddingVertical: spacing.lg,
        },
        // Text
        text: {
            fontWeight: '600',
            textAlign: 'center',
        },
        textPrimary: {
            color: '#ffffff',
        },
        textSecondary: {
            color: colors.text,
        },
        textOutline: {
            color: colors.text,
        },
        textGhost: {
            color: colors.textSecondary,
        },
        textDestructive: {
            color: '#ffffff',
        },
        // Text Sizes
        textSm: {
            fontSize: typography.sm,
        },
        textMd: {
            fontSize: typography.base,
        },
        textLg: {
            fontSize: typography.lg,
        },
        disabled: {
            opacity: 0.5,
        },
    });

    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'secondary': return styles.secondary;
            case 'outline': return styles.outline;
            case 'ghost': return styles.ghost;
            case 'destructive': return styles.destructive;
            default: return styles.primary;
        }
    };

    const getTextStyle = (): TextStyle => {
        switch (variant) {
            case 'secondary': return styles.textSecondary;
            case 'outline': return styles.textOutline;
            case 'ghost': return styles.textGhost;
            case 'destructive': return styles.textDestructive;
            default: return styles.textPrimary;
        }
    };

    const getSizeStyle = (): ViewStyle => {
        switch (size) {
            case 'sm': return styles.sm;
            case 'lg': return styles.lg;
            default: return styles.md;
        }
    };

    const getTextSizeStyle = (): TextStyle => {
        switch (size) {
            case 'sm': return styles.textSm;
            case 'lg': return styles.textLg;
            default: return styles.textMd;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                getVariantStyle(),
                getSizeStyle(),
                (disabled || loading) && styles.disabled,
                style,
            ]}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' || variant === 'destructive' ? '#ffffff' : colors.text} />
            ) : (
                <>
                    {icon}
                    <Text style={[styles.text, getTextStyle(), getTextSizeStyle(), icon ? { marginLeft: spacing.sm } : {}]}>
                        {label}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}
