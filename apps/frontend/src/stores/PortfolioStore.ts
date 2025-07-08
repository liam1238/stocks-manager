import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import type { Stock } from '@interfaces/stocks';
import { API_BASE_URL } from '@api/stockApi';

class PortfolioStore {
  stocks: Stock[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPortfolio() {
    this.loading = true;
    try {
      const response = await axios.get<Stock[]>(`${API_BASE_URL}/stock`);
      runInAction(() => {
        this.stocks = response.data;
      });
    } catch (err) {
      console.error('Error loading portfolio', err);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async addStock(symbol: string) {
    const uppercaseSymbol = symbol.toUpperCase();
    if (this.stocks.find((s) => s.symbol === uppercaseSymbol)) return;

    try {
      // Fetch live stock info from FMP
      const quoteResponse = await axios.get<Stock>(
        `${API_BASE_URL}/stock/${uppercaseSymbol}/quote`
      );
      const stockFromApi = quoteResponse.data;

      // Add immediately to the UI
      runInAction(() => {
        const newStock: Stock = {
          symbol: stockFromApi.symbol,
          name: stockFromApi.name || '',
          price: Number(stockFromApi.price) || 0,
          changePercent: Number(stockFromApi.changePercent) || 0,
        };

        this.stocks = [newStock, ...this.stocks];
      });

      // Persist to DB — no need to await
      axios.post(`${API_BASE_URL}/stock`, {
        symbol: uppercaseSymbol,
        name: stockFromApi.name,
      });
    } catch (err) {
      console.error('Failed to fetch stock from API', err);

      // If API fails (or there is no such a stock) - remove from the list
      runInAction(() => {
        this.stocks = this.stocks.filter((s) => s.symbol !== uppercaseSymbol);
      });
    }
  }

  async removeStock(symbol: string) {
    const index = this.stocks.findIndex((s) => s.symbol === symbol);
    if (index === -1) return;

    const backup = [...this.stocks]; // save backup

    // Remove from list immediately
    runInAction(() => {
      this.stocks = this.stocks.filter((s) => s.symbol !== symbol);
    });

    try {
      await axios.delete(`${API_BASE_URL}/stock/${symbol}`);
    } catch (err) {
      console.error('Failed to remove stock', err);

      // Revert on failure
      runInAction(() => {
        this.stocks = backup;
      });
    }
  }
}

const portfolioStore = new PortfolioStore();
export default portfolioStore;
