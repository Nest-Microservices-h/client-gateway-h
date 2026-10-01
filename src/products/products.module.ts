import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { envs } from '@/config';
import { NatsModule } from '@/transports/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [NatsModule],
})
export class ProductsModule {
  constructor() {
    console.log({ envs });
  }
}
