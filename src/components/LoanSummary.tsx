import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLoanState } from '../contexts/LoanContext';
import { useTheme } from '../contexts/ThemeContext';

export default function LoanSummary() {
  const { loans } = useLoanState();
  const { colors } = useTheme();

  // Derived state dihitung langsung dari source data utama
  const summary = useMemo(() => {
    const total = loans.length;
    const returned = loans.filter((item) => item.isReturned).length;
    const borrowed = total - returned;
    return { total, borrowed, returned };
  }, [loans]);

  const cards = [
    {
      id: 'total',
      label: 'Total Buku',
      value: summary.total,
      accentColor: colors.primary,
      bgColor: colors.primaryLight,
      icon: '📚',
    },
    {
      id: 'borrowed',
      label: 'Dipinjam',
      value: summary.borrowed,
      accentColor: colors.warning,
      bgColor: colors.warningSurface,
      icon: '⏳',
    },
    {
      id: 'returned',
      label: 'Dikembalikan',
      value: summary.returned,
      accentColor: colors.success,
      bgColor: colors.successSurface,
      icon: '✅',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.cardRow}>
        {cards.map((card) => (
          <View
            key={card.id}
            style={[
              styles.summaryCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: card.bgColor },
                ]}
              >
                <Text style={styles.cardIcon}>{card.icon}</Text>
              </View>
              <Text style={[styles.cardValue, { color: card.accentColor }]}>
                {card.value}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={[styles.cardLabel, { color: colors.textMuted }]}
            >
              {card.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 8,
  },
  summaryCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 14,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

