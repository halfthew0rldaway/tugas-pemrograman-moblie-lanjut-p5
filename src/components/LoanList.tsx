import React, { useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLoanState } from '../contexts/LoanContext';
import { useTheme } from '../contexts/ThemeContext';
import LoanItem from './LoanItem';

export default function LoanList() {
  const { loans, filter, searchQuery } = useLoanState();
  const { colors } = useTheme();

  // Derived state: filtered loans list
  const visibleLoans = useMemo(() => {
    return loans.filter((loan) => {
      // Status filter
      if (filter === 'borrowed' && loan.isReturned) return false;
      if (filter === 'returned' && !loan.isReturned) return false;

      // Search query filter
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = loan.bookTitle.toLowerCase().includes(query);
        const matchBorrower = loan.borrowerName.toLowerCase().includes(query);
        const matchCategory = loan.category.toLowerCase().includes(query);
        if (!matchTitle && !matchBorrower && !matchCategory) {
          return false;
        }
      }

      return true;
    });
  }, [loans, filter, searchQuery]);

  if (visibleLoans.length === 0) {
    return (
      <View
        style={[
          styles.emptyContainer,
          {
            backgroundColor: colors.surface,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Text style={styles.emptyIcon}>📖</Text>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          Tidak Ada Data Peminjaman
        </Text>
        <Text style={[styles.emptyDesc, { color: colors.textMuted }]}>
          {searchQuery.trim()
            ? `Tidak ditemukan hasil untuk "${searchQuery}". Coba kata kunci lain.`
            : filter === 'borrowed'
            ? 'Hebat! Semua buku saat ini telah dikembalikan.'
            : filter === 'returned'
            ? 'Belum ada catatan buku yang sudah dikembalikan.'
            : 'Belum ada catatan peminjaman. Tekan tombol "+ Peminjaman" untuk menambahkan.'}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={visibleLoans}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <LoanItem loan={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 14,
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptyDesc: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280,
  },
});

