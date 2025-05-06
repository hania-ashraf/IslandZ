import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  sessionId: string;

  @Prop([
    {
      productId: { type: Types.ObjectId, ref: 'Product' },
      size: String,
      quantity: Number,
      price: Number,        // ⬅️ Price per unit (copied at time of checkout)
      subtotal: Number      // ⬅️ quantity × price
    },
  ])
  items: {
    productId: Types.ObjectId;
    size: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];

  @Prop({ required: true })
  total: number;

  @Prop({ default: 'pending' })
  status: 'Pending' | 'Confirmed' | 'Paid' | 'Shipped' | 'Cancelled';
}

export const OrderSchema=SchemaFactory.createForClass(Order); 