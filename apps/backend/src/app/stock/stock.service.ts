import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock, StockDocument } from './schemas/stock.schema';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock.name) private stockModel: Model<StockDocument>
  ) {}

  async create(stock: Partial<Stock>): Promise<Stock> {
    return this.stockModel.create(stock);
  }

  async findAll(): Promise<Stock[]> {
    return this.stockModel.find().exec();
  }

  async findOne(symbol: string): Promise<Stock> {
    const stock = await this.stockModel.findOne({ symbol }).exec();
    if (!stock) throw new NotFoundException('Stock not found');
    return stock;
  }

  async remove(symbol: string): Promise<void> {
    await this.stockModel.deleteOne({ symbol }).exec();
  }
}
