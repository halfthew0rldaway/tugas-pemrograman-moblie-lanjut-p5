export type LoanFilter = 'all' | 'borrowed' | 'returned';

export interface LoanRecord {
  id: string;
  borrowerName: string;
  bookTitle: string;
  category: string;
  borrowDate: string;
  isReturned: boolean;
  createdAt: number;
}

export interface LoanState {
  loans: LoanRecord[];
  filter: LoanFilter;
  searchQuery: string;
}

export type LoanAction =
  | { type: 'loan/add'; payload: LoanRecord }
  | { type: 'loan/toggleStatus'; payload: { id: string } }
  | { type: 'loan/delete'; payload: { id: string } }
  | { type: 'filter/set'; payload: { filter: LoanFilter } }
  | { type: 'search/set'; payload: { query: string } };

