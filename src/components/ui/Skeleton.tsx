import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps, StyleSheet } from 'react-native';
import { useColors } from '@/utils/styles';
import { borderRadius } from '@/config/theme';

export function Skeleton({ style, ...props }: ViewProps) {
    const opacity = useRef(new Animated.Value(0.3)).current;
    const colors = useColors();

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();

        return () => animation.stop();
    }, [opacity]);

    const styles = StyleSheet.create({
        skeleton: {
            backgroundColor: colors.border, // Use border color as base for skeleton
            borderRadius: borderRadius.sm,
        },
    });

    return (
        <Animated.View
            style={[styles.skeleton, { opacity }, style]}
            {...props}
        />
    );
}
