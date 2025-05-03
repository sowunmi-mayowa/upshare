export interface TransactionHistory {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  date: string;
  email: string;
}

export interface ConnectsState {
  history: TransactionHistory[];
  isLoading: boolean;
  error: string | null;
}

export type ConnectsAction =
  | { type: 'FETCH_HISTORY_REQUEST' }
  | { type: 'FETCH_HISTORY_SUCCESS'; payload: TransactionHistory[] }
  | { type: 'FETCH_HISTORY_FAILURE'; payload: string }
  | { type: 'ADD_TRANSACTION'; payload: TransactionHistory };