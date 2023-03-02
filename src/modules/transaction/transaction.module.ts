import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from '../../entities/Index';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],

  imports: [TypeOrmModule.forFeature([...Entities], 'MSSQL_CONNECTION')],
})
export class TransactionModule {}
