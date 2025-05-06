import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Subscription {

  @Prop({ required: true, unique: true }) 
  email: string;

}

export const SubscriptionSchema=SchemaFactory.createForClass(Subscription);

//for the user can subscribe and get 10% discount for the first time 