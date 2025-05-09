import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';  
import { CreateContactDto } from 'src/contact/dto/submitForm.dto';



@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendConfirmationEmail(to: string, orderId: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Order Confirmation',
      text: `Thank you for your order! Your order with ID ${orderId} has been confirmed.`,
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendSellerNotification(contact : CreateContactDto ):Promise<void>{

    const mailOptions= {
      from : contact.email,
      to:process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${contact.name}`,
      replyTo: contact.email,
      text: `
      you recieved a new message
       from: ${contact.name} <${contact.email}>
      message: ${contact.message}`,

    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Seller notification sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send message');
    }
  }

  }



