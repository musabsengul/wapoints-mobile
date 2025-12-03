import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/config/theme';

export const useColors = () => {
  const colorScheme = useThemeStore((state) => state.colorScheme);
  return colorScheme === 'dark' ? colors.dark : colors.light;
};

export const createStyles = <T extends Record<string, ViewStyle | TextStyle>>(
  styleCreator: (colors: typeof colors.light) => T
) => {
  return StyleSheet.create(styleCreator(colors.light));
};

export const getStatusColor = (status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REJECTED', isDark: boolean) => {
  const palette = isDark ? colors.dark : colors.light;
  switch (status) {
    case 'PENDING':
      return palette.warning;
    case 'CONFIRMED':
      return palette.confirmed;
    case 'CANCELLED':
      return palette.cancelled;
    case 'REJECTED':
      return palette.rejected;
    default:
      return palette.textSecondary;
  }
};

