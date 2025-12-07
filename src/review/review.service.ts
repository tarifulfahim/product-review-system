import { BadRequestException, Injectable } from '@nestjs/common';
import { ReviewDTO } from 'src/dtos/reviews.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async insertReview(info: ReviewDTO, id: string) {
    const product = await this.prisma.products.findFirst({
      where: { id: id },
    });
    if (!product) {
      throw new BadRequestException('There is no product of this ID');
    }

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

    const current_average_rating =
      parseFloat(product.average_rating ?? '0') || 0;
    const old_count = parseFloat(product.review_count ?? '0') || 0;
    const new_count = old_count + 1;
    const new_average_rating =
      (current_average_rating * old_count + parseFloat(review.rating)) /
      new_count;

    await this.prisma.products.update({
      where: { id: id },
      data: {
        average_rating: new_average_rating.toFixed(2).toString(),
        review_count: new_count.toString(),
      },
    });

    return review;
  }
}
