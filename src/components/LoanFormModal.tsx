import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLoanDispatch } from '../contexts/LoanContext';
import { useTheme } from '../contexts/ThemeContext';
import type { LoanRecord } from '../types/loan';

interface LoanFormModalProps {
  visible: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  'Teknologi',
  'Sastra',
  'Sains',
  'Filsafat',
  'Bisnis',
  'Sejarah',
];

// Helper to format today's date in Indonesian
function getTodayFormatted(): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des',
  ];
  const now = new Date();
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function LoanFormModal({
  visible,
  onClose,
}: LoanFormModalProps) {
  const dispatch = useLoanDispatch();
  const { colors } = useTheme();

  const [borrowerName, setBorrowerName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [category, setCategory] = useState('Teknologi');
  const [borrowDate, setBorrowDate] = useState(getTodayFormatted());
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = () => {
    setBorrowerName('');
    setBookTitle('');
    setCategory('Teknologi');
    setBorrowDate(getTodayFormatted());
    setErrorMsg('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = () => {
    const cleanBorrower = borrowerName.trim();
    const cleanTitle = bookTitle.trim();
    const cleanDate = borrowDate.trim() || getTodayFormatted();

    if (!cleanBorrower) {
      setErrorMsg('Nama peminjam wajib diisi.');
      return;
    }

    if (!cleanTitle) {
      setErrorMsg('Judul buku wajib diisi.');
      return;
    }

    const newLoan: LoanRecord = {
      id: `loan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      borrowerName: cleanBorrower,
      bookTitle: cleanTitle,
      category,
      borrowDate: cleanDate,
      isReturned: false,
      createdAt: Date.now(),
    };

    dispatch({
      type: 'loan/add',
      payload: newLoan,
    });

    handleClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <Pressable style={styles.backdropDismiss} onPress={handleClose} />

        <View
          style={[
            styles.modalCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Tambah Peminjaman
              </Text>
              <Text style={[styles.modalSubtitle, { color: colors.textMuted }]}>
                Catat transaksi peminjaman buku perpustakaan
              </Text>
            </View>
            <Pressable
              onPress={handleClose}
              style={[
                styles.closeButton,
                { backgroundColor: colors.surfaceHover },
              ]}
            >
              <Text style={[styles.closeButtonText, { color: colors.textMuted }]}>
                ✕
              </Text>
            </Pressable>
          </View>

          {/* Error Banner */}
          {!!errorMsg && (
            <View
              style={[
                styles.errorBanner,
                {
                  backgroundColor: colors.dangerSurface,
                  borderColor: colors.danger,
                },
              ]}
            >
              <Text style={[styles.errorText, { color: colors.danger }]}>
                ⚠️ {errorMsg}
              </Text>
            </View>
          )}

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.formScroll}
          >
            {/* Input Nama Peminjam */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Nama Peminjam <Text style={{ color: colors.danger }}>*</Text>
              </Text>
              <TextInput
                value={borrowerName}
                onChangeText={(text) => {
                  setBorrowerName(text);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Contoh: Muhammad Farhan"
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                  },
                ]}
              />
            </View>

            {/* Input Judul Buku */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Judul Buku <Text style={{ color: colors.danger }}>*</Text>
              </Text>
              <TextInput
                value={bookTitle}
                onChangeText={(text) => {
                  setBookTitle(text);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Contoh: Pengantar Kecerdasan Buatan"
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                  },
                ]}
              />
            </View>

            {/* Kategori Buku Chips */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Kategori Buku
              </Text>
              <View style={styles.categoryWrap}>
                {CATEGORIES.map((cat) => {
                  const isCatSelected = category === cat;
                  return (
                    <Pressable
                      key={cat}
                      onPress={() => setCategory(cat)}
                      style={[
                        styles.catChip,
                        {
                          backgroundColor: isCatSelected
                            ? colors.primary
                            : colors.tagBackground,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.catChipText,
                          {
                            color: isCatSelected ? '#FFFFFF' : colors.tagText,
                          },
                        ]}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Input Tanggal Peminjaman */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Tanggal Peminjaman
              </Text>
              <TextInput
                value={borrowDate}
                onChangeText={setBorrowDate}
                placeholder="DD MMM YYYY"
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                  },
                ]}
              />
            </View>
          </ScrollView>

          {/* Form Actions */}
          <View style={styles.modalActions}>
            <Pressable
              accessibilityRole="button"
              onPress={handleClose}
              style={[
                styles.cancelButton,
                {
                  backgroundColor: colors.surfaceHover,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.cancelButtonText, { color: colors.text }]}>
                Batal
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={handleSubmit}
              style={[
                styles.submitButton,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.submitButtonText}>Simpan Peminjaman</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backdropDismiss: {
    ...StyleSheet.absoluteFill,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  modalSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  errorBanner: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  formScroll: {
    paddingBottom: 6,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  catChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  catChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    flex: 2,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

