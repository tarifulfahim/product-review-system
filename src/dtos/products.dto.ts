import { IsOptional, IsString } from 'class-validator';

export class ProductDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  average_rating: string;
}
