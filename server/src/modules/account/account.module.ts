import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '@sp/schemas';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import {TransactionModule} from '../transaction/transaction.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),TransactionModule],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountsModule {}


