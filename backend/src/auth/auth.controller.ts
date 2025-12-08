import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UserDTO } from 'src/dtos/users.dto';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UsePipes(new ValidationPipe())
  registerUser(@Body() info: UserDTO) {
    return this.authService.registerUser(info);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { access_token, user } = this.authService.login(req.user);

    res.cookie('auth_token', access_token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'lax',
      secure: false, // Set to true in production with HTTPS
    });

    return user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token');
    return { message: 'Logged out successfully' };
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.authService.getAllUsers();
  }
}
