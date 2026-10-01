import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Logger,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import {
  CreateOrderDto,
  OrderPaginationDto,
  StatusDto,
  UpdateOrderDto,
} from './dto';
import { NATS_SERVICE } from '@/config';
import { PaginationDto } from '@/common';

@Controller('orders')
export class OrdersController {
  private readonly logger = new Logger(Controller.name);

  constructor(
    @Inject(NATS_SERVICE) private readonly ordersClient: ClientProxy,
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
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersClient.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        this.logger.log(err);
        throw new RpcException(err);
      }),
    );
  }

  @Get(':status')
  async findOneByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.ordersClient.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    // return { id, ...statusDto };
    try {
      const updateStatus = await firstValueFrom(
        this.ordersClient.send('changeOrderStatus', { id, ...statusDto }),
      );
      return updateStatus;
    } catch (error: any) {
      this.logger.log(error);
      throw new RpcException(error);
    }
  }
}
