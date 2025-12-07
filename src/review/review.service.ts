import { BadRequestException, Injectable } from '@nestjs/common';
import { ReviewDTO } from 'src/dtos/reviews.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async insertReview(info: ReviewDTO, id: string) {
    const check = await this.prisma.reviews.findFirst({
      where: { user_email: info.user_email, product_id: id },
    });
    if (check) {
      throw new BadRequestException('You have already given a review');
    }

    const review = await this.prisma.reviews.create({
      data: {
        user_email: info.user_email,
        rating: info.rating,
        comment: info.comment,
        product_id: id,
      },
    });

    return review;
  }
}
