import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceHover: string;
  card: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryLight: string;
  success: string;
  successSurface: string;
  warning: string;
  warningSurface: string;
  danger: string;
  dangerSurface: string;
  inputBackground: string;
  tagBackground: string;
  tagText: string;
  tabActiveBackground: string;
  tabActiveText: string;
  tabInactiveText: string;
};

type ThemeContextValue = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

export const lightColors: ThemeColors = {
  background: '#F1F5F9', // Crisp slate background
  surface: '#FFFFFF',
  surfaceHover: '#F8FAFC',
  card: '#FFFFFF',
  cardBorder: '#E2E8F0',
  text: '#0F172A', // Slate 900
  textMuted: '#64748B', // Slate 500
  border: '#CBD5E1',
  primary: '#2563EB', // Blue 600
  primaryLight: '#EFF6FF',
  success: '#10B981', // Emerald 500
  successSurface: '#ECFDF5',
  warning: '#F59E0B', // Amber 500
  warningSurface: '#FFFBEB',
  danger: '#EF4444', // Red 500
  dangerSurface: '#FEF2F2',
  inputBackground: '#F8FAFC',
  tagBackground: '#E0E7FF',
  tagText: '#3730A3',
  tabActiveBackground: '#2563EB',
  tabActiveText: '#FFFFFF',
  tabInactiveText: '#64748B',
};

export const darkColors: ThemeColors = {
  background: '#0B1120', // Deep night navy
  surface: '#1E293B', // Slate 800
  surfaceHover: '#334155',
  card: '#1E293B',
  cardBorder: '#334155',
  text: '#F8FAFC', // Slate 50
  textMuted: '#94A3B8', // Slate 400
  border: '#334155',
  primary: '#38BDF8', // Sky 400
  primaryLight: '#082F49',
  success: '#34D399', // Emerald 400
  successSurface: '#064E3B',
  warning: '#FBBF24', // Amber 400
  warningSurface: '#78350F',
  danger: '#F87171', // Red 400
  dangerSurface: '#7F1D1D',
  inputBackground: '#0F172A',
  tagBackground: '#312E81',
  tagText: '#C7D2FE',
  tabActiveBackground: '#38BDF8',
  tabActiveText: '#0F172A',
  tabInactiveText: '#94A3B8',
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const value = useMemo<ThemeContextValue>(
    () => ({
      isDark,
      colors: isDark ? darkColors : lightColors,
      toggleTheme: () => setIsDark((prev) => !prev),
    }),
    [isDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme harus digunakan di dalam ThemeProvider.');
  }
  return context;
}

