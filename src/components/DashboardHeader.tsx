import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardHeaderProps {
  onOpenAddModal: () => void;
}

export default function DashboardHeader({ onOpenAddModal }: DashboardHeaderProps) {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>
            PERPUSTAKAAN KAMPUS
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ganti ke tema ${isDark ? 'terang' : 'gelap'}`}
          onPress={toggleTheme}
          style={({ pressed }) => [
            styles.themeButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text style={[styles.themeIcon, { color: colors.text }]}>
            {isDark ? '☀️' : '🌙'}
          </Text>
          <Text style={[styles.themeLabel, { color: colors.text }]}>
            {isDark ? 'Terang' : 'Gelap'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.titleRow}>
        <View style={styles.titleTextContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            Dashboard Peminjaman
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Sistem sirkulasi dan status inventaris buku
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tambah Peminjaman Buku Baru"
          onPress={onOpenAddModal}
          style={({ pressed }) => [
            styles.addButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text style={styles.addButtonIcon}>+</Text>
          <Text style={styles.addButtonText}>Peminjaman</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  themeIcon: {
    fontSize: 13,
  },
  themeLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  titleTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    gap: 4,
  },
  addButtonIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});

