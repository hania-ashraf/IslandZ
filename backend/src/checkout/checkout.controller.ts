import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService:CheckoutService){}

    @Post()
    createOrder(@Body() dto:CreateOrderDto){
        return this.checkoutService.createOrder(dto);
    }
   
}
