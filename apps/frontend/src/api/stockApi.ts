import axios from 'axios';
import type { Stock } from '@interfaces/stocks';

export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Fetches a single stock quote by symbol from the API.
 * @param symbol - The stock symbol (e.g. "AAPL")
 * @returns Stock data
 */
export const fetchStockQuote = async (symbol: string): Promise<Stock> => {
  try {
    const response = await axios.get<Stock>(
      `${API_BASE_URL}/stock/${symbol}/quote`
    );

    if (!response.data) {
      throw new Error(`No data returned for symbol: ${symbol}`);
    }

    return response.data;
  } catch (err) {
    console.error(`Failed to fetch stock ${symbol}`, err);
    throw err;
  }
};

/**
 * Fetches multiple stock quotes by their symbols.
 * @param symbols - Array of stock symbols
 * @returns Array of Stock data
 */
export const fetchStockQuotes = async (symbols: string[]): Promise<Stock[]> => {
  try {
    const joined = symbols.join(',');
    const response = await axios.get<Stock[]>(
      `${API_BASE_URL}/stock/quotes?symbols=${joined}`
    );

    if (!response.data || response.data.length === 0) {
      throw new Error(`No data returned for symbols: ${joined}`);
    }

    return response.data;
  } catch (err) {
    console.error(
      `Failed to fetch quotes for symbols: ${symbols.join(',')}`,
      err
    );
    throw err;
  }
};
