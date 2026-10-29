import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLoanDispatch } from '../contexts/LoanContext';
import { useTheme } from '../contexts/ThemeContext';
import type { LoanRecord } from '../types/loan';

interface LoanItemProps {
  loan: LoanRecord;
}

export default function LoanItem({ loan }: LoanItemProps) {
  const dispatch = useLoanDispatch();
  const { colors } = useTheme();

  const handleToggle = () => {
    dispatch({
      type: 'loan/toggleStatus',
      payload: { id: loan.id },
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Hapus Catatan',
      `Apakah Anda yakin ingin menghapus peminjaman buku "${loan.bookTitle}" oleh ${loan.borrowerName}?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () =>
            dispatch({
              type: 'loan/delete',
              payload: { id: loan.id },
            }),
        },
      ],
    );
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      {/* Category Pill and Status Indicator */}
      <View style={styles.cardTopRow}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: colors.tagBackground },
          ]}
        >
          <Text style={[styles.categoryText, { color: colors.tagText }]}>
            {loan.category || 'Umum'}
          </Text>
        </View>

        {/* Status Badge */}
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: loan.isReturned
                ? colors.successSurface
                : colors.warningSurface,
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: loan.isReturned
                  ? colors.success
                  : colors.warning,
              },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              {
                color: loan.isReturned ? colors.success : colors.warning,
              },
            ]}
          >
            {loan.isReturned ? 'Sudah Dikembalikan' : 'Belum Dikembalikan'}
          </Text>
        </View>
      </View>

      {/* Book Title */}
      <Text
        style={[
          styles.bookTitle,
          { color: colors.text },
          loan.isReturned && styles.bookTitleReturned,
        ]}
        numberOfLines={2}
      >
        {loan.bookTitle}
      </Text>

      {/* Metadata: Borrower and Borrow Date */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>👤</Text>
          <Text
            numberOfLines={1}
            style={[styles.metaText, { color: colors.text }]}
          >
            {loan.borrowerName}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📅</Text>
          <Text style={[styles.metaText, { color: colors.textMuted }]}>
            {loan.borrowDate}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

      {/* Action Buttons Row */}
      <View style={styles.actionsRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ubah status peminjaman ${loan.bookTitle}`}
          onPress={handleToggle}
          style={({ pressed }) => [
            styles.statusToggleButton,
            {
              backgroundColor: loan.isReturned
                ? colors.surfaceHover
                : colors.successSurface,
              borderColor: loan.isReturned ? colors.border : colors.success,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.statusToggleText,
              {
                color: loan.isReturned ? colors.textMuted : colors.success,
              },
            ]}
          >
            {loan.isReturned ? '↩ Batal Kembali' : '✓ Tandai Dikembalikan'}
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Hapus peminjaman ${loan.bookTitle}`}
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.deleteButton,
            {
              backgroundColor: colors.dangerSurface,
              borderColor: 'transparent',
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          <Text style={[styles.deleteButtonText, { color: colors.danger }]}>
            🗑 Hapus
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 8,
  },
  bookTitleReturned: {
    opacity: 0.8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 1,
  },
  metaIcon: {
    fontSize: 12,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  statusToggleButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  statusToggleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

