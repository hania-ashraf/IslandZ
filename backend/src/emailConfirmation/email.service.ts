import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';  // Correct way to import Nodemailer


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
}


