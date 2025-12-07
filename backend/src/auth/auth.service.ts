import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDTO } from 'src/dtos/users.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerUser(info: UserDTO) {
    const validate = await this.prisma.users.findFirst({
      where: { email: info.email },
    });
    if (validate) {
      throw new BadRequestException('User already registered');
    }

    const user = await this.prisma.users.create({
      data: info,
    });

    return user;
  }
}
