import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LoanProvider } from './src/contexts/LoanContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import DashboardScreen from './src/screens/DashboardScreen';

function AppContent() {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <DashboardScreen />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LoanProvider>
        <AppContent />
      </LoanProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
});

