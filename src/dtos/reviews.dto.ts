import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ReviewDTO {
  @IsString()
  @IsNotEmpty({
    message: "Email can't be empty",
  })
  @Matches(/^[a-z0-9.]+@gmail.com$/, {
    message:
      'Email must contain @gmail.com at the end and all the character should be in lower case',
  })
  user_email: string;

  @IsString()
  @Matches(/^[1-4](\.\d+)?$|^5(\.0+)?$/, {
    message: 'Rating must be a string representing a number between 1 and 5',
  })
  rating: string;

  @IsString()
  comment: string;
}
