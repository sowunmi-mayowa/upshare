import React from 'react';
import { FiTrendingUp } from "react-icons/fi";


interface ConnectCardProps {
  connects: number;
}

const ConnectCard: React.FC<ConnectCardProps> = ({ connects }) => {
  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-neutral-800">Your Connects</h3>
        <div className="p-2 bg-primary-50 rounded-full">
        <FiTrendingUp />
        </div>
      </div>
      
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-primary-600">{connects}</span>
        <span className="ml-2 text-neutral-500 text-sm">connects available</span>
      </div>
      
      <div className="mt-4 pt-4 border-t border-neutral-100">
        <p className="text-sm text-neutral-600">
          Use your connects to apply for jobs or share with others
        </p>
      </div>
    </div>
  );
};

export default ConnectCard;