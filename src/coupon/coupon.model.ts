import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coupon extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ default: 100 })
  points: number;

  @Prop({ default: false })
  isRedeemed: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
