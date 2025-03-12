import React from 'react';
import { StockData } from '../types';
import StockEntry from './StockEntry';

interface StockEntriesListProps {
  entries: StockData[];
  onDelete: (index: number) => void;
}

const StockEntriesList: React.FC<StockEntriesListProps> = ({ entries, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <p>Enter a stock symbol above to start tracking</p>
      </div>
    );
  }

  return (
    <div className="stock-entries">
      {entries.map((entry, index) => (
        <StockEntry
          key={`${entry.symbol}-${index}`}
          entry={entry}
          index={index}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default StockEntriesList;