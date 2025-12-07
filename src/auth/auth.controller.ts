import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDTO } from 'src/dtos/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registerUser')
  @UsePipes(new ValidationPipe())
  registerUser(@Body() info: UserDTO) {
    return this.authService.registerUser(info);
  }
}
