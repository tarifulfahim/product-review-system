import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewDTO } from 'src/dtos/reviews.dto';
import { ReviewService } from './review.service';

@Controller('products/:id/')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('reviews')
  @UsePipes(new ValidationPipe())
  insertReview(@Body() info: ReviewDTO, @Param('id') id: string) {
    return this.reviewService.insertReview(info, id);
  }
}
