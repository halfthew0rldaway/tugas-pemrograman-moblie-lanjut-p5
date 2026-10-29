import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DashboardHeader from '../components/DashboardHeader';
import LoanFilter from '../components/LoanFilter';
import LoanFormModal from '../components/LoanFormModal';
import LoanList from '../components/LoanList';
import LoanSummary from '../components/LoanSummary';
import { useTheme } from '../contexts/ThemeContext';

export default function DashboardScreen() {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Header with Title and Theme Switcher */}
      <DashboardHeader onOpenAddModal={() => setModalVisible(true)} />

      {/* Dashboard Summary Statistics */}
      <LoanSummary />

      {/* Search and Status Filters */}
      <LoanFilter />

      {/* Main List Area */}
      <View style={styles.listContainer}>
        <LoanList />
      </View>

      {/* Add New Loan Modal Form */}
      <LoanFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});

