import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDTO {
  @IsString()
  @IsNotEmpty({
    message: "Name can't be empty",
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: "Description can't be empty",
  })
  description: string;
}
