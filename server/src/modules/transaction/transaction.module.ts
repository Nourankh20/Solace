import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '@sp/schemas';
import {AccountsModule} from '../account/account.module';

@Module({
  imports:[MongooseModule.forFeature([{ name:Transaction.name, schema: TransactionSchema }]),AccountsModule],
  exports: [TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}