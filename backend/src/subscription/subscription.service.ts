import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Subscription } from 'src/schemas/subscribtion.Schema';

@Injectable()
export class SubscriptionService {
    constructor(@InjectModel(Subscription.name) private subscriptionModel: mongoose.Model<Subscription>) { }


    async firstTimeSubscription(email: string) {

        try {

            let subscribe = await this.subscriptionModel.findOne({ email });

            if (!subscribe) {

                subscribe = new this.subscriptionModel({ email, hasUsedDiscount: false })
                await subscribe.save();
            }

            if (subscribe.hasUsedDiscount) {
                throw new ConflictException('Discount already used.');
            }

            subscribe.hasUsedDiscount = true;
            await subscribe.save();

            return 0.10; //10%

        }
        catch (error) {
            // Rethrow known exceptions (like ConflictException)
            if (error instanceof ConflictException) {
                throw error;
            }

            // Log the unexpected error (optional)
            console.error('SubscriptionService error:', error);

            // Throw a general server error for anything unexpected
            throw new InternalServerErrorException('Failed to apply discount.');
        }

    }
}
