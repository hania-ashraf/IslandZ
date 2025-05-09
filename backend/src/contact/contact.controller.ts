import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/submitForm.dto';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService){}

    @Post()
    async submitContactForm(@Body() dto : CreateContactDto){
        const form = await this.contactService.submitContactForm(dto);
        return{
            message: 'Message sent successfully',
            form
        }
    }
}
