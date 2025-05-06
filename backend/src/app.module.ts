import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import { CartModule } from './cart/cart.module';
import { ProductSchema } from './schemas/product.Schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/IslandZ'), ProductModule, ContactModule, CartModule
    
  ],
  controllers: [AppController, ContactController],
  providers: [AppService, ContactService],
})
export class AppModule {}
