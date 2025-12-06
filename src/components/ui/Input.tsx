import React from 'react';
import { View, TextInput, Text, TextInputProps, StyleSheet } from 'react-native';
import { useColors } from '@/utils/styles';
import { spacing, borderRadius, typography } from '@/config/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export function Input({
    label,
    error,
    leftIcon,
    rightIcon,
    style,
    ...props
}: InputProps) {
    const colors = useColors();

    const styles = StyleSheet.create({
        container: {
            width: '100%',
        },
        label: {
            fontSize: typography.sm,
            fontWeight: '500',
            color: colors.text,
            marginBottom: spacing.xs,
        },
        inputContainer: {
            flexDirection: 'row',
            items: 'center',
            borderWidth: 1,
            borderColor: error ? colors.error : colors.border,
            borderRadius: borderRadius.md,
            backgroundColor: colors.surface,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm, // Adjusted for better height
        },
        input: {
            flex: 1,
            fontSize: typography.base,
            color: colors.text,
            paddingVertical: 0, // Remove default padding
            height: 24, // Fixed height for text input
        },
        error: {
            fontSize: typography.sm,
            color: colors.error,
            marginTop: spacing.xs,
        },
        leftIcon: {
            marginRight: spacing.sm,
        },
        rightIcon: {
            marginLeft: spacing.sm,
        },
    });

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <TextInput
                    style={styles.input}
                    placeholderTextColor={colors.textSecondary}
                    {...props}
                />
                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}
