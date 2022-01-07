import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef } from "@nestjs/common";
import { Account, AccountSchema } from '@sp/schemas';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import {TransactionModule} from '../transaction/transaction.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),forwardRef(() => TransactionModule)],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountsModule {}


