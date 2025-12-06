import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/utils/styles';
import { spacing } from '@/config/theme';

interface ScreenLayoutProps extends ViewProps {
    withSafeArea?: boolean;
    edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export function ScreenLayout({
    children,
    style,
    withSafeArea = true,
    edges = ['top', 'bottom'],
    ...props
}: ScreenLayoutProps) {
    const colors = useColors();
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: withSafeArea && edges.includes('top') ? insets.top : 0,
            paddingBottom: withSafeArea && edges.includes('bottom') ? insets.bottom : 0,
            paddingLeft: withSafeArea && edges.includes('left') ? insets.left : 0,
            paddingRight: withSafeArea && edges.includes('right') ? insets.right : 0,
        },
        content: {
            flex: 1,
            paddingHorizontal: spacing.md,
        },
    });

    return (
        <View style={[styles.container, style]} {...props}>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}
