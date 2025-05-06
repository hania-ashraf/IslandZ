import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps:true})

export class Cart {
  @Prop({ required: true })
  sessionId: string; // Unique ID for this client's session

  @Prop([
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ])
  items: {
    productId: string;
    size: string;
    quantity: number;
  }[];
}
export const CartSchema=SchemaFactory.createForClass(Cart);