import { PaginationDto } from '@/common';
import { PRODUCT_SERVICE } from '@/config';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(Controller.name);

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
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    // First way with promise
    /* try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find-one-product' }, { id }),
      );
      this.logger.log({ product });
      return product;
    } catch (error: any) {
      this.logger.log(error);
      throw new RpcException(error);
      } */

    // Second way with observable
    return this.productsClient.send({ cmd: 'find-one-product' }, { id }).pipe(
      catchError((err) => {
        this.logger.log(err);
        throw new RpcException(err);
      }),
    );
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
