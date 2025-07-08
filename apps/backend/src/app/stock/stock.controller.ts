import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { FmpService } from './fmp.service';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(
    private readonly fmpService: FmpService,
    private readonly stockService: StockService
  ) {}

  // GET — live quote from FMP for a single symbol
  @Get(':symbol/quote')
  getQuote(@Param('symbol') symbol: string) {
    return this.fmpService.getQuote(symbol);
  }

  // POST — fetch from FMP api, return immediately, save to DB in background
  @Post()
  async add(@Body() body: { symbol: string; name?: string }) {
    const quote = await this.fmpService.getQuote(body.symbol);

    // Save to DB after returning response
    this.stockService
      .create(quote)
      .catch((err) => console.error('Failed to save stock to DB:', err));

    return quote; // return data immediately
  }

  // GET — list from DB, enriched with latest FMP data
  @Get()
  async getAll() {
    const dbStocks = await this.stockService.findAll();
    const symbols = dbStocks.map((s) => s.symbol);
    try {
      const quotes = await this.fmpService.getBatchQuotes(symbols);
      return quotes;
    } catch {
      // fallback to DB data if FMP batch fails
      return dbStocks;
    }
  }

  // GET — batch quote by symbols
  @Get('quotes')
  getBatchQuotes(@Query('symbols') symbols: string) {
    const symbolList = symbols.split(',').map((s) => s.trim().toUpperCase());
    return this.fmpService.getBatchQuotes(symbolList);
  }

  // DELETE — remove a stock from DB
  @Delete(':symbol')
  async remove(@Param('symbol') symbol: string) {
    return this.stockService.remove(symbol);
  }
}
