import { IsNotEmpty } from 'class-validator';

export class TransactionDto{

  @IsNotEmpty()
  Display_date: string;

  @IsNotEmpty()
  name: string;

  
  debit: number;

 
  credit: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  accountid: string;

}