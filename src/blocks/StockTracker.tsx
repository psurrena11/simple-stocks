import React, { useState, FormEvent } from 'react';
import { StockData, ApiResponse } from '../types';
import StockAstrology from './StockAstrology'

const StockTracker: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('');
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
      setSymbol(''); // Clear the input field
    }
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (symbol.trim()) {
      fetchStockData(symbol.trim());
    }
  };

  const handleDelete = (index: number): void => {
    setStockEntries(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="stock-tracker">
      <h1>Celestial Stock Tracker</h1>
      <p className="astro-intro">Discover your stocks' cosmic destiny</p>
      
      <form onSubmit={handleSubmit} className="stock-form">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g., IBM)"
          className="stock-input"
        />
        <button type="submit" className="submit-btn" disabled={isLoading || !symbol.trim()}>
          {isLoading ? 'Loading...' : 'Track Stock'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="stock-entries">
        {stockEntries.map((entry, index) => (
          <div key={index} className="stock-card">
            <div className="stock-header">
              <h2>{entry.symbol}</h2>
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(index)}
                aria-label="Delete"
              >
                ×
              </button>
            </div>
            <div className="stock-details">
              <p className="open-price">Opening: ${parseFloat(entry.open).toFixed(2)}</p>
              <p className="timestamp">As of: {new Date(entry.timestamp).toLocaleString()}</p>
              <StockAstrology 
                symbol={entry.symbol} 
                openPrice={entry.open} 
                timestamp={entry.timestamp} 
              />
            </div>
          </div>
        ))}
      </div>
      
      {stockEntries.length === 0 && (
        <div className="empty-state">
          <p>Enter a stock symbol above to start tracking</p>
        </div>
      )}
    </div>
  );
};

export default StockTracker;