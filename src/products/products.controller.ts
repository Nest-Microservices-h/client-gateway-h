import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  findAllProducts() {
    return 'All products';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Product ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `Product ${id} deleted`;
  }
  @Patch(':id')
  patchProduct(@Param('id') id: string, @Body() body: any) {
    return `Product ${id} patched`;
  }
}
