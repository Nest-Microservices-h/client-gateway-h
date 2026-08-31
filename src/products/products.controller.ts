import { PaginationDto } from '@/common';
import { PRODUCT_SERVICE } from '@/config';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    // const { page, limit } = paginationDto;
    return this.productsClient.send(
      { cmd: 'find-all-products' },
      // { page, limit },
      paginationDto,
    );
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
