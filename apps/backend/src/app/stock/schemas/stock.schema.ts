import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema()
export class Stock {
  @Prop({ required: true, unique: true })
  symbol!: string;

  @Prop()
  name?: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
