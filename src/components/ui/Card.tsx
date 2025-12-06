import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useColors } from '@/utils/styles';
import { borderRadius, spacing } from '@/config/theme';

export function Card({ style, children, ...props }: ViewProps) {
    const colors = useColors();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.surface,
            borderRadius: borderRadius['2xl'], // Updated to 2xl
            padding: spacing.lg, // Updated to lg (p-5 equivalent)
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
        },
    });

    return (
        <View style={[styles.card, style]} {...props}>
            {children}
        </View>
    );
}
