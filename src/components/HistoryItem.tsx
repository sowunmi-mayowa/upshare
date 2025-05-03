import React from 'react';
import { TransactionHistory } from '../types/connects';
import { ImArrowUpRight2, ImArrowDownLeft2 } from "react-icons/im";

interface HistoryItemProps {
  transaction: TransactionHistory;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ transaction }) => {
  const { type, amount, date, email } = transaction;
  const isSent = type === 'sent';
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <div className="py-4 border-b border-neutral-100 last:border-0">
      <div className="flex items-center">
        <div className={`p-2 rounded-full mr-4 ${isSent ? 'bg-error-50' : 'bg-success-50'}`}>
          {isSent ? (
            <ImArrowUpRight2 className="h-5 w-5 text-error-500" />
          ) : (
            <ImArrowDownLeft2 className="h-5 w-5 text-success-500" />
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-neutral-800">
              {isSent ? 'Sent to' : 'Received from'} {email}
            </h4>
            <span className={`font-semibold ${isSent ? 'text-error-500' : 'text-success-500'}`}>
              {isSent ? '-' : '+'}{amount} connects
            </span>
          </div>
          <div className="text-sm text-neutral-500">{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;