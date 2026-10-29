import type { LoanAction, LoanRecord, LoanState } from '../types/loan';

export const initialLoanState: LoanState = {
  loans: [
    {
      id: 'loan-1',
      borrowerName: 'Ahmad Faiz',
      bookTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      category: 'Teknologi',
      borrowDate: '24 Okt 2026',
      isReturned: false,
      createdAt: Date.now() - 5 * 86400000,
    },
    {
      id: 'loan-2',
      borrowerName: 'Siti Rahmawati',
      bookTitle: 'Bumi Manusia',
      category: 'Sastra',
      borrowDate: '22 Okt 2026',
      isReturned: true,
      createdAt: Date.now() - 7 * 86400000,
    },
    {
      id: 'loan-3',
      borrowerName: 'Budi Santoso',
      bookTitle: 'Desain Sistem Terdistribusi Modern',
      category: 'Teknologi',
      borrowDate: '26 Okt 2026',
      isReturned: false,
      createdAt: Date.now() - 3 * 86400000,
    },
    {
      id: 'loan-4',
      borrowerName: 'Dewi Lestari',
      bookTitle: 'Filosofi Teras',
      category: 'Filsafat',
      borrowDate: '20 Okt 2026',
      isReturned: true,
      createdAt: Date.now() - 9 * 86400000,
    },
    {
      id: 'loan-5',
      borrowerName: 'Rian Pratama',
      bookTitle: 'Algoritma & Struktur Data Lanjutan',
      category: 'Teknologi',
      borrowDate: '28 Okt 2026',
      isReturned: false,
      createdAt: Date.now() - 1 * 86400000,
    },
  ],
  filter: 'all',
  searchQuery: '',
};

export function loanReducer(state: LoanState, action: LoanAction): LoanState {
  switch (action.type) {
    case 'loan/add':
      return {
        ...state,
        loans: [action.payload, ...state.loans],
      };

    case 'loan/toggleStatus':
      return {
        ...state,
        loans: state.loans.map((loan) =>
          loan.id === action.payload.id
            ? { ...loan, isReturned: !loan.isReturned }
            : loan,
        ),
      };

    case 'loan/delete':
      return {
        ...state,
        loans: state.loans.filter((loan) => loan.id !== action.payload.id),
      };

    case 'filter/set':
      return {
        ...state,
        filter: action.payload.filter,
      };

    case 'search/set':
      return {
        ...state,
        searchQuery: action.payload.query,
      };

    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
}

