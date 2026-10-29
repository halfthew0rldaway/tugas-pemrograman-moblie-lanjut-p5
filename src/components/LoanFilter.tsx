import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLoanDispatch, useLoanState } from '../contexts/LoanContext';
import { useTheme } from '../contexts/ThemeContext';
import type { LoanFilter as FilterType } from '../types/loan';

export default function LoanFilter() {
  const { loans, filter, searchQuery } = useLoanState();
  const dispatch = useLoanDispatch();
  const { colors } = useTheme();

  const totalCount = loans.length;
  const borrowedCount = loans.filter((l) => !l.isReturned).length;
  const returnedCount = loans.filter((l) => l.isReturned).length;

  const filterOptions: {
    value: FilterType;
    label: string;
    count: number;
  }[] = [
    { value: 'all', label: 'Semua', count: totalCount },
    { value: 'borrowed', label: 'Belum Kembali', count: borrowedCount },
    { value: 'returned', label: 'Sudah Kembali', count: returnedCount },
  ];

  return (
    <View style={styles.container}>
      {/* Search Input Bar */}
      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          accessibilityLabel="Cari buku atau nama peminjam"
          value={searchQuery}
          onChangeText={(query) =>
            dispatch({ type: 'search/set', payload: { query } })
          }
          placeholder="Cari judul buku atau peminjam..."
          placeholderTextColor={colors.textMuted}
          style={[styles.searchInput, { color: colors.text }]}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <Pressable
            onPress={() =>
              dispatch({ type: 'search/set', payload: { query: '' } })
            }
            style={styles.clearSearchBtn}
          >
            <Text style={[styles.clearSearchText, { color: colors.textMuted }]}>
              ✕
            </Text>
          </Pressable>
        )}
      </View>

      {/* Filter Segment / Chips */}
      <View style={styles.chipsRow}>
        {filterOptions.map((opt) => {
          const isSelected = filter === opt.value;
          return (
            <Pressable
              key={opt.value}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`Filter ${opt.label}, ${opt.count} data`}
              onPress={() =>
                dispatch({
                  type: 'filter/set',
                  payload: { filter: opt.value },
                })
              }
              style={({ pressed }) => [
                styles.chip,
                {
                  backgroundColor: isSelected
                    ? colors.primary
                    : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.cardBorder,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipLabel,
                  {
                    color: isSelected ? '#FFFFFF' : colors.text,
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
              >
                {opt.label}
              </Text>
              <View
                style={[
                  styles.countBadge,
                  {
                    backgroundColor: isSelected
                      ? 'rgba(255, 255, 255, 0.25)'
                      : colors.tagBackground,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.countBadgeText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.tagText,
                    },
                  ]}
                >
                  {opt.count}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  clearSearchBtn: {
    padding: 4,
  },
  clearSearchText: {
    fontSize: 14,
    fontWeight: '700',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 9,
    paddingVertical: 8,
    paddingHorizontal: 6,
    gap: 6,
  },
  chipLabel: {
    fontSize: 12,
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
});

