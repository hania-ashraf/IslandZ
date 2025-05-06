import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import { CartModule } from './cart/cart.module';
import { CheckoutController } from './checkout/checkout.controller';
import { CheckoutService } from './checkout/checkout.service';
import { CheckoutModule } from './checkout/checkout.module';
import { Order, OrderSchema } from './schemas/order.Schema';
import { Cart, CartSchema } from './schemas/cart.Schema';
import { EmailService } from './emailConfirmation/email.service';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  MongooseModule.forRoot('mongodb://localhost:27017/IslandZ'), ProductModule, 
  ContactModule, CartModule, CheckoutModule, SubscriptionModule
  ],
  controllers: [AppController, ContactController, CheckoutController],
  providers: [AppService, ContactService, CheckoutService, EmailService, SubscriptionService],
})
export class AppModule {}
