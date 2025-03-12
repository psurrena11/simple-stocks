import React, { useState } from 'react';
import { StockData, ApiResponse } from '../types';
import StockEntriesList from './StockEntriesList';
import StockAstrology from './StockAstrology';
import StockForm from './StockForm';

const StockTracker: React.FC = () => {
  const [stockEntries, setStockEntries] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async (stockSymbol: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=WU5Z0M4HA0M7CDZ3`;
      
      const response = await fetch(apiUrl);
      const data = await response.json() as ApiResponse;
      
      // Check if the API returned an error
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      if (data['Note']) {
        throw new Error(data['Note']); // API call frequency limitation message
      }
      
      // Get the metadata and time series data
      const metaData = data['Meta Data'];
      const timeSeries = data['Time Series (5min)'];
      
      if (!metaData || !timeSeries) {
        throw new Error('Invalid data format received from API');
      }
      
      // Get the symbol from metadata
      const symbol = metaData['2. Symbol'];
      
      // Get the most recent timestamp
      const timestamps = Object.keys(timeSeries).sort().reverse();
      const mostRecentTimestamp = timestamps[0];
      
      // Get the open price from the most recent entry
      const openPrice = timeSeries[mostRecentTimestamp]['1. open'];
      
      // Create a new stock entry
      const newStockEntry: StockData = {
        symbol,
        open: openPrice,
        timestamp: mostRecentTimestamp
      };
      
      // Add the new entry to the list
      setStockEntries(prev => [...prev, newStockEntry]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (index: number): void => {
    setStockEntries(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="stock-tracker">
      <h1>Stock<br/>Tracker</h1>
      
      <section>
        <StockForm onSubmit={fetchStockData} isLoading={isLoading} />
        {error && <div className="error-message">{error}</div>}
      </section>
      
      <section>    
        <div className="stock-tracker-main">
          <div className="stock-list-container">
            <StockEntriesList 
              entries={stockEntries} 
              onDelete={handleDelete} 
            />
          </div>
          
          <div className="astrology-container">
            <StockAstrology stockEntries={stockEntries} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StockTracker;