import { create } from 'zustand';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  themeMode: ThemeMode;
  colorScheme: ColorSchemeName;
  setThemeMode: (mode: ThemeMode) => void;
  initialize: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  themeMode: 'system',
  colorScheme: Appearance.getColorScheme(),

  setThemeMode: (mode: ThemeMode) => {
    set({ themeMode: mode });
    
    if (mode === 'system') {
      set({ colorScheme: Appearance.getColorScheme() });
    } else {
      set({ colorScheme: mode });
    }
  },

  initialize: () => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const { themeMode } = get();
      if (themeMode === 'system') {
        set({ colorScheme });
      }
    });

    set({ colorScheme: Appearance.getColorScheme() });

    return () => subscription.remove();
  },
}));

