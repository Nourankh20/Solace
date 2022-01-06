import { IsNotEmpty } from 'class-validator';

export class TransactionDto{

  @IsNotEmpty()
  from_To:string;

  @IsNotEmpty()
  Display_date: string;

  @IsNotEmpty()
  description: string;

  debit: number;

  credit: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  accountid: string;

}