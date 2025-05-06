import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Cart } from 'src/schemas/cart.Schema';
import { AddToCartDto } from './dto/addToCart.dto';
import { UpdateCartItemDto } from './dto/updateCart.dto';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private cartModel: mongoose.Model<Cart>) { }
    async viewCart(sessionId: string) {
        try {
            const cart = await this.cartModel.findOne({ sessionId }).populate('items.productId');
            if (!cart) throw new NotFoundException('Cart not found');
            return cart;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch cart');
        }

    }

    async addToCart(addToCart: AddToCartDto) {
        try {
            let cart = await this.cartModel.findOne({ sessionId: addToCart.sessionId })
            if (!cart) {
                cart = await this.cartModel.create({
                    sessionId: addToCart.sessionId,
                    items: [addToCart],
                });
            }
            else {
                const existingItemIndex = cart.items.findIndex(
                    (item) =>
                        item.productId.toString() === addToCart.productId &&
                        item.size === addToCart.size,
                );

                if (existingItemIndex !== -1) {
                    cart.items[existingItemIndex].quantity += addToCart.quantity;
                } else {
                    cart.items.push(addToCart);
                }

                await cart.save();
            }

            return cart;
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to add to cart');
        }
    }


    async updateCartItem(dto: UpdateCartItemDto): Promise<Cart> {
        try {
          const cart = await this.cartModel.findOne({ sessionId: dto.sessionId });
          if (!cart) throw new NotFoundException('Cart not found');
      
          const itemIndex = cart.items.findIndex(
            (item) =>
              item.productId.toString() === dto.productId &&
              (!dto.size || item.size === dto.size),
          );
      
          if (itemIndex === -1) throw new NotFoundException('Item not found in cart');
      
          if (dto.quantity !== undefined) {
            cart.items[itemIndex].quantity = dto.quantity;
          }
      
          if (dto.size !== undefined) {
            cart.items[itemIndex].size = dto.size;
          }
      
          await cart.save();
          return cart;
        } catch (error) {
          if (error instanceof NotFoundException) throw error;
          throw new InternalServerErrorException('Failed to update cart item');
        }
      }
      

      // cart.service.ts
async removeItemFromCart(sessionId: string, productId: string): Promise<Cart> {
    try {
      const cart = await this.cartModel.findOne({ sessionId });
      if (!cart) throw new NotFoundException('Cart not found');
  
      const initialLength = cart.items.length;
  
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId,
      );
  
      if (cart.items.length === initialLength) {
        throw new NotFoundException('Product not found in cart');
      }
  
      await cart.save();
      return cart;
      
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to remove item from cart');
    }
  }
  



}
