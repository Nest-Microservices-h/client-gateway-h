import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Logger,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE, PRODUCT_SERVICE } from '@/config';
import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '@/common';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger(Controller.name);

  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log({ createOrderDto });
    return this.ordersClient.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        this.logger.log(err);
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders', {});
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersClient.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        this.logger.log(err);
        throw new RpcException(err);
      }),
    );
  }
}
