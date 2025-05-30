import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from 'src/schemas/contact.Schema';
import { EmailService } from 'src/emailConfirmation/email.service';

@Module({
  imports:[MongooseModule.forFeature([{name: Contact.name, schema: ContactSchema}])],
  controllers: [ContactController],
  providers: [ContactService, EmailService]
})
export class ContactModule {}
