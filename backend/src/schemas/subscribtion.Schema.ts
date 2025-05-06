// src/schemas/subscription.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Subscription extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: true })
  isEligibleForDiscount: boolean; // Tracks if the user is eligible for a 10% discount

  @Prop({ default: false })
  hasUsedDiscount: boolean; // Tracks if the user has used the discount on their first order
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
