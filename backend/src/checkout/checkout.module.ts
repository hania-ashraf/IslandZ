import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { Order, OrderSchema } from 'src/schemas/order.Schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.Schema';
import { Cart, CartSchema } from 'src/schemas/cart.Schema';
import { EmailService } from 'src/emailConfirmation/email.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }])
    ],

    controllers: [CheckoutController],
    providers: [CheckoutService,EmailService],
})
export class CheckoutModule { }
