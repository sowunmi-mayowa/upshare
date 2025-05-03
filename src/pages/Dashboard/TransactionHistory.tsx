import React, { useEffect } from 'react';
import { useConnects } from '../../context/ConnectsContext';
import HistoryItem from '../../components/HistoryItem';

const TransactionHistory: React.FC = () => {
  const { state: { history, isLoading }, fetchHistory } = useConnects();
  
  useEffect(() => {
    fetchHistory();
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-primary-50 rounded-full mr-3">
        </div>
        <h2 className="text-xl font-bold text-neutral-800">Transaction History</h2>
      </div>
      
      {isLoading ? (
        <div className="py-16 flex justify-center">
        </div>
      ) : history.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-neutral-500">No transaction history yet.</p>
          <p className="text-sm text-neutral-400 mt-1">
            Start sharing connects to see your transactions here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {history.map((transaction) => (
            <HistoryItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;