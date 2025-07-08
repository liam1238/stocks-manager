import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FmpService {
  private readonly apiKey = process.env.FMP_API_KEY;
  private readonly baseUrl = 'https://financialmodelingprep.com/api/v3';

  async getQuote(symbol: string) {
    try {
      const url = `${this.baseUrl}/quote/${symbol}?apikey=${this.apiKey}`;
      const response = await axios.get(url);

      if (!response.data || response.data.length === 0) {
        throw new Error('No data returned for symbol');
      }

      const quote = response.data[0];
      return {
        symbol: quote.symbol,
        name: quote.name,
        price: quote.price,
        changePercent: quote.changesPercentage,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        `Error fetching quote for ${symbol}`
      );
    }
  }

  async getBatchQuotes(symbols: string[]) {
  try {
    const joined = symbols.join(',');
    const url = `${this.baseUrl}/quote/${joined}?apikey=${this.apiKey}`;
    const response = await axios.get(url);

    return response.data.map((quote: any) => ({
      symbol: quote.symbol,
      name: quote.name,
      price: quote.price,
      changePercent: quote.changesPercentage,
    }));
  } catch (err) {
    throw new InternalServerErrorException(`Error fetching quotes: ${symbols.join(', ')}`);
  }
}

  async getListOfStocks() {
    try {
      const url = `${this.baseUrl}/stock/list?apikey=${this.apiKey}`;
      const response = await axios.get(url);

      if (!response.data || response.data.length === 0) {
        throw new Error('No data returned for list of stocks');
      }

      const data = response.data;
      return {
        list: {
          symbol: data.map((stock: any) => stock.symbol),
          name: data.map((stock: any) => stock.name),
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(`Error fetching list of stocks`);
    }
  }
}
