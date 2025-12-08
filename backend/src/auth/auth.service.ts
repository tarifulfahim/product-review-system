import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/dtos/users.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerUser(info: UserDTO) {
    const validate = await this.prisma.users.findFirst({
      where: { email: info.email },
    });
    if (validate) {
      throw new BadRequestException('User already registered');
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(info.password, 10);

    const user = await this.prisma.users.create({
      data: {
        ...info,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Return user without password
    const { password: _, ...result } = user;
    return result;
  }

  login(user: any) {
    const { id, email, role } = user as {
      id: string;
      email: string;
      role: string;
    };
    const payload = {
      sub: id,
      email,
      role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
