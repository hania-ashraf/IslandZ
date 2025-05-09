import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Contact } from 'src/schemas/contact.Schema';
import { CreateContactDto } from './dto/submitForm.dto';
import { EmailService } from 'src/emailConfirmation/email.service';

@Injectable()
export class ContactService {
    constructor(@InjectModel(Contact.name) private contactModel: mongoose.Model<Contact>,
    private emailService: EmailService) { }


    async submitContactForm(dto: CreateContactDto) {
        try {

            const form = new this.contactModel({
                name: dto.name,
                email: dto.email,
                message: dto.message
            });

             
            const savedForm = await form.save();

            await this.emailService.sendSellerNotification(savedForm);

        }
        catch (error) {
            console.error('ContactService error:', error);
            throw new InternalServerErrorException('Failed to submit contact form');
        }
    }
}
