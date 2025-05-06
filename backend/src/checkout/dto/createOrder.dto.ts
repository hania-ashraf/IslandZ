import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  sessionId: string;
  customerEmail: string;
}
