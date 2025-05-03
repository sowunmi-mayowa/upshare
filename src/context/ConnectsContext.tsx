import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ConnectsState, ConnectsAction, TransactionHistory } from '../types/connects';
import { useAuth } from './AuthContext';

// Initial state
const initialState: ConnectsState = {
  history: [],
  isLoading: false,
  error: null,
};

// Create context
const ConnectsContext = createContext<{
  state: ConnectsState;
  dispatch: React.Dispatch<ConnectsAction>;
  shareConnects: (recipientEmail: string, amount: number) => Promise<void>;
  fetchHistory: () => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  shareConnects: async () => {},
  fetchHistory: async () => {},
});

// Connects reducer
const connectsReducer = (state: ConnectsState, action: ConnectsAction): ConnectsState => {
  switch (action.type) {
    case 'FETCH_HISTORY_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_HISTORY_SUCCESS':
      return {
        ...state,
        isLoading: false,
        history: action.payload,
        error: null,
      };
    case 'FETCH_HISTORY_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        history: [action.payload, ...state.history],
      };
    default:
      return state;
  }
};

// Connects Provider
export const ConnectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(connectsReducer, initialState);
  const { state: authState, updateConnects } = useAuth();

  // Load history from localStorage on mount
  useEffect(() => {
    if (authState.user) {
      fetchHistory();
    }
  }, [authState.user]);

  // Fetch transaction history
  const fetchHistory = async () => {
    if (!authState.user) return;
    
    dispatch({ type: 'FETCH_HISTORY_REQUEST' });
    try {
      // In a real app, this would be an API call
      const key = `upshare_history_${authState.user.email}`;
      const storedHistory = localStorage.getItem(key) || '[]';
      const history = JSON.parse(storedHistory) as TransactionHistory[];
      
      dispatch({ type: 'FETCH_HISTORY_SUCCESS', payload: history });
    } catch (error) {
      dispatch({ type: 'FETCH_HISTORY_FAILURE', payload: (error as Error).message });
    }
  };

  // Share connects with another user
  const shareConnects = async (recipientEmail: string, amount: number) => {
    if (!authState.user) return;
    
    try {
      // Validate user has enough connects
      if (authState.user.connects < amount) {
        throw new Error('Not enough connects available');
      }
      
      // Validate recipient exists
      const storedUsers = localStorage.getItem('upshare_users') || '[]';
      const users = JSON.parse(storedUsers) as { name: string; email: string; password: string; connects: number }[];
      
      const recipientIndex = users.findIndex(user => user.email === recipientEmail);
      if (recipientIndex === -1) {
        throw new Error('Recipient not found');
      }
      
      // Can't send to self
      if (recipientEmail === authState.user.email) {
        throw new Error('Cannot send connects to yourself');
      }
      
      // Update sender connects
      const newSenderConnects = authState.user.connects - amount;
      updateConnects(newSenderConnects);
      
      // Update recipient connects
      users[recipientIndex].connects += amount;
      localStorage.setItem('upshare_users', JSON.stringify(users));
      
      // Create transaction records
      const transactionTime = new Date().toISOString();
      const transactionId = `tx_${Date.now()}`;
      
      // Sender transaction (sent)
      const senderTransaction: TransactionHistory = {
        id: transactionId,
        type: 'sent',
        amount,
        date: transactionTime,
        email: recipientEmail,
      };
      
      // Recipient transaction (received)
      const recipientTransaction: TransactionHistory = {
        id: `${transactionId}_r`,
        type: 'received',
        amount,
        date: transactionTime,
        email: authState.user.email,
      };
      
      // Save sender transaction
      const senderKey = `upshare_history_${authState.user.email}`;
      const storedSenderHistory = localStorage.getItem(senderKey) || '[]';
      const senderHistory = JSON.parse(storedSenderHistory) as TransactionHistory[];
      senderHistory.unshift(senderTransaction);
      localStorage.setItem(senderKey, JSON.stringify(senderHistory));
      
      // Save recipient transaction
      const recipientKey = `upshare_history_${recipientEmail}`;
      const storedRecipientHistory = localStorage.getItem(recipientKey) || '[]';
      const recipientHistory = JSON.parse(storedRecipientHistory) as TransactionHistory[];
      recipientHistory.unshift(recipientTransaction);
      localStorage.setItem(recipientKey, JSON.stringify(recipientHistory));
      
      // Update state with new transaction
      dispatch({ type: 'ADD_TRANSACTION', payload: senderTransaction });
      
      // In a real app, this is where you would send the confirmation email
      console.log(`Email sent to ${recipientEmail} confirming ${amount} connects received`);
      
      return { success: true };
    } catch (error) {
      console.error('Error sharing connects:', error);
      throw error;
    }
  };

  return (
    <ConnectsContext.Provider value={{ state, dispatch, shareConnects, fetchHistory }}>
      {children}
    </ConnectsContext.Provider>
  );
};

export const useConnects = () => useContext(ConnectsContext);