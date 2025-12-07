import { Injectable } from '@nestjs/common';
import { ProductDTO } from 'src/dtos/products.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  // async getAllProducts() {
  //   return this.prisma.products.findMany();
  // }

  async registerProduct(info: ProductDTO[]) {
    const product = await this.prisma.products.createMany({
      data: info,
    });
    return product;
  }

  async getAllProducts() {
    const products = await this.prisma.products.findMany({
      select: { name: true, description: true, average_rating: true },
    });
    return products;
  }

  async singleProduct(id: string) {
    const product = await this.prisma.products.findFirst({
      where: { id: id },
    });

    const review = await this.prisma.reviews.findMany({
      select: { user_email: true, rating: true, comment: true },
      where: { product_id: id },
    });

    return {
      message: 'Product Info & Review',
      name: product?.name,
      description: product?.description,
      reviews: review,
    };
  }
}
