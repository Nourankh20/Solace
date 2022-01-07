import { Body, Controller, Get, Post, Request, UseGuards,Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionService } from './transaction.service';
import {TransactionDto} from './dto/transaction.dto'
import {ObjectId} from 'mongoose';



@Controller('transactions')
export class TransactionController {
  // TODO: Define your Transaction Endpoints
  constructor(private transactionService: TransactionService) {}

  /**
   * API endpoint handler returns the authenticated user from JWT payload
   */    

  //@UseGuards(AuthGuard('jwt'))


@Get()
getAll():any{
  return this.transactionService.getAll();
}

  
  @Get(':accountId')
  transaction(@Param('accountId') accountId: string): any {
    return this.transactionService.getTrancation(accountId);
  }


  //useGuard
  @Post('')
  CreateTransaction(@Body() dto:TransactionDto):any{
      const transaction = this.transactionService.createTransaction(dto);
      return transaction;
  }


  /**
   * API endpoint handler returns two trsnsactions when a user does an internal transfer.
   * @param {TransactionDto} sender_dto 
   * @returns {TransactionDto[]}  An array of size 2,where index 0 is the transaction of the sender and index 1 is the one of the reciever
   */

  @Post('internaltransfer')
  internalTransfer(@Body() sender_dto:TransactionDto):any{
      const sender_transaction = this.transactionService.createTransaction(sender_dto);

      const reciever_transaction = this.transactionService.createRecieverTransaction(sender_dto);
      return [sender_transaction,reciever_transaction];
  }

  
}
