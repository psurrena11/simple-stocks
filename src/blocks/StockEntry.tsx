import React from 'react';
import { StockData } from '../types';

interface StockEntryProps {
  entry: StockData;
  index: number;
  onDelete: (index: number) => void;
}

const StockEntry: React.FC<StockEntryProps> = ({ entry, index, onDelete }) => {
  return (
    <div className="stock-card">
      <div className="stock-header">
        <h2>{entry.symbol}</h2>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(index)}
          aria-label="Delete"
        >
          ×
        </button>
      </div>
      <div className="stock-details">
        <p className="open-price">Opening: ${parseFloat(entry.open).toFixed(2)}</p>
        <p className="timestamp">As of: {new Date(entry.timestamp).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StockEntry;