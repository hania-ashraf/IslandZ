import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService){}

    @Post()
    async firstTimeSubscription(@Body('email') email:string ){
        if (!email) {
            throw new BadRequestException('Email is required.');
          }
        const discount= await this.subscriptionService.firstTimeSubscription(email);
        return {
            message: 'Discount applied',
            discount
        };
    }
}
