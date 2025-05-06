import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/schemas/order.Schema';
import mongoose from 'mongoose';
import { Product } from 'src/schemas/product.Schema';
import { Cart } from 'src/schemas/cart.Schema';
import { EmailService } from 'src/emailConfirmation/email.service';

@Injectable()
export class CheckoutService {

    constructor(@InjectModel(Order.name) private orderModel: mongoose.Model<Order>,
    @InjectModel(Cart.name) private cartModel: mongoose.Model<Cart>,
    private emailService: EmailService,) { }


    async createOrder(dto: CreateOrderDto) {
        try {
            console.log('dto:',dto);
            const cart = await this.cartModel.findOne({ sessionId: dto.sessionId })
                .populate('items.productId');
                
            if (!cart || cart.items.length === 0) {
                throw new NotFoundException('Cart is empty or not found');
            }

            const orderItems = cart.items.map((item) => {
                const product = item.productId as unknown as Product;
                const price = product.price;

                return {
                    productId: product._id,
                    size: item.size,
                    quantity: item.quantity,
                    price,
                    subtotal: price * item.quantity
                };
            });
            const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

            const newOrder = new this.orderModel({
                sessionId: dto.sessionId,
                items: orderItems,
                total,
            });
            await newOrder.save();

        const customerEmail = dto.customerEmail; // Assume customerEmail is passed in the DTO
         await this.emailService.sendConfirmationEmail(
        customerEmail,
        newOrder._id.toString(),
      );

      newOrder.status = 'Confirmed';
      await newOrder.save();

            //clearing up the cart
            // cart.items = [];
            // await cart.save();

            return newOrder;
        }

        catch (error) {
            console.error('Checkout Error:', error);
            throw new InternalServerErrorException('Checkout failed');
        }

    }
}
