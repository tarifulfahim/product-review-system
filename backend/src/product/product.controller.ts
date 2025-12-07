import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductDTO } from 'src/dtos/products.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  registerProduct(@Body() info: ProductDTO[]) {
    return this.productService.registerProduct(info);
  }

  @Get('/')
  getAllProduct() {
    return this.productService.getAllProducts();
  }

  @Get('singleProduct/:id')
  singleProduct(@Param('id') id: string) {
    return this.productService.singleProduct(id);
  }
}
