import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/addToCart.dto';
import { UpdateCartItemDto } from './dto/updateCart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get(':sessionId')
    viewCart(@Param('sessionId') sessionId: string) {
        return this.cartService.viewCart(sessionId);
    }

    @Post()
    addToCart(@Body() addToCartDto: AddToCartDto) {
        return this.cartService.addToCart(addToCartDto);
    }

    @Patch()
    updateCartItem(@Body() dto: UpdateCartItemDto) {
        return this.cartService.updateCartItem(dto);
    }

    // cart.controller.ts
    @Delete(':sessionId/:productId')
    async removeItem(
        @Param('sessionId') sessionId: string,
        @Param('productId') productId: string,
    ) {
        return this.cartService.removeItemFromCart(sessionId, productId);
    }





}
