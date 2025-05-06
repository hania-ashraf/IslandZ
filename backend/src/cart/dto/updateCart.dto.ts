import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCartItemDto {
  @IsString()
  sessionId: string;

  @IsMongoId()
  productId: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
