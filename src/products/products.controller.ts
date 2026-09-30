import { PaginationDto } from '@/common';
import { NATS_SERVICE } from '@/config';
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
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(Controller.name);

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create-product' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    // const { page, limit } = paginationDto;
    return this.client.send(
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
    return this.client.send({ cmd: 'find-one-product' }, { id }).pipe(
      catchError((err) => {
        this.logger.log(err);
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    return this.client.send({ cmd: 'remove-product' }, { id }).pipe(
      catchError((err) => {
        this.logger.log(err);
        throw new RpcException(err);
      }),
    );
  }
  @Patch(':id')
  patchProduct(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send({ cmd: 'update-product' }, { id, ...updateProductDto })
      .pipe(
        catchError((err) => {
          this.logger.log(err);
          throw new RpcException(err);
        }),
      );
  }
}
