import { Module } from '@nestjs/common';
import { DBCrudModule } from 'src/modules/dbcrud/dbcrud.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [DBCrudModule],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
