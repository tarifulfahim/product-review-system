import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { ProductDTO } from 'src/dtos/products.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Version('1')
  @Get('/')
  async getAllProductsController() {
    return this.productService.getAllProducts();
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  registerProduct(@Body() info: ProductDTO[]) {
    return this.productService.registerProduct(info);
  }

  @Get('allProducts')
  getAllProduct() {
    return this.productService.getAllProducts();
  }

  @Get('singleProduct/:id')
  singleProduct(@Param('id') id: string) {
    return this.productService.singleProduct(id);
  }
}
