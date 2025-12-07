import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty({
    message: "Name can't be empty",
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: "Email can't be empty",
  })
  @Matches(/^[a-z0-9.]+@gmail.com$/, {
    message:
      'Email must contain @gmail.com at the end and all the character should be in lower case',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: "Password can't be empty",
  })
  password: string;
}
