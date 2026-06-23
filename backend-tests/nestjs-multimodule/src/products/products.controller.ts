import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return { ...this.productsService.findAll(), service: 'RBAC权限' };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const product = this.productsService.findById(id);
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }
}
