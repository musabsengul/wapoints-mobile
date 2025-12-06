import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useColors } from '@/utils/styles';
import { typography } from '@/config/theme';

export function H1({ style, children, ...props }: TextProps) {
    const colors = useColors();
    return (
        <Text
            style={[
                { fontSize: typography['3xl'], fontWeight: 'bold', color: colors.text },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
}

export function H2({ style, children, ...props }: TextProps) {
    const colors = useColors();
    return (
        <Text
            style={[
                { fontSize: typography['2xl'], fontWeight: '600', color: colors.text },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
}

export function H3({ style, children, ...props }: TextProps) {
    const colors = useColors();
    return (
        <Text
            style={[
                { fontSize: typography.xl, fontWeight: '600', color: colors.text },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
}

export function Body({ style, children, ...props }: TextProps) {
    const colors = useColors();
    return (
        <Text
            style={[
                { fontSize: typography.base, color: colors.text },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
}

export function Caption({ style, children, ...props }: TextProps) {
    const colors = useColors();
    return (
        <Text
            style={[
                { fontSize: typography.sm, color: colors.textSecondary },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
}
