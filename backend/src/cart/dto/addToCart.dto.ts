import { IsMongoId, IsNumber, IsString } from "class-validator";

export class AddToCartDto {
    @IsString()
    sessionId: string;
  
    @IsMongoId()
    productId: string;
  
    @IsString()
    size: string;
  
    @IsNumber()
    quantity: number;
  }
  