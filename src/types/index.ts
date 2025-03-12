// Define common interfaces and types used across the application

export interface StockData {
    symbol: string;
    open: string;
    timestamp: string;
  }
  
  export interface ApiResponse {
    'Meta Data': {
      '1. Information': string;
      '2. Symbol': string;
      '3. Last Refreshed': string;
      '4. Interval': string;
      '5. Output Size': string;
      '6. Time Zone': string;
    };
    'Time Series (5min)': {
      [key: string]: {
        '1. open': string;
        '2. high': string;
        '3. low': string;
        '4. close': string;
        '5. volume': string;
      };
    };
    'Error Message'?: string;
    'Note'?: string;
  }