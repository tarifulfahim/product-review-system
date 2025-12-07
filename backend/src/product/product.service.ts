import { Injectable } from '@nestjs/common';
import { ProductDTO } from 'src/dtos/products.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async registerProduct(info: ProductDTO[]) {
    const product = await this.prisma.products.createMany({
      data: info,
    });
    return product;
  }

  async getAllProducts() {
    const products = await this.prisma.products.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        average_rating: true,
        review_count: true,
        created_at: true,
        updated_at: true,
      },
    });
    return products;
  }

  async singleProduct(id: string) {
    const product = await this.prisma.products.findFirst({
      where: { id: id },
    });

    const review = await this.prisma.reviews.findMany({
      select: {
        id: true,
        user_email: true,
        rating: true,
        comment: true,
        created_at: true,
      },
      where: { product_id: id },
    });

    return {
      message: 'Product Info & Review',
      id: product?.id,
      name: product?.name,
      description: product?.description,
      average_rating: product?.average_rating,
      revire_count: product?.review_count,
      created_at: product?.created_at,
      updated_at: product?.updated_at,
      reviews: review,
    };
  }
}
