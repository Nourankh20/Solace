import { IsNotEmpty } from 'class-validator';

export class RequestDto{

  @IsNotEmpty()
  accountid: string;

  @IsNotEmpty()
  receiverAccountNumber:string;

  @IsNotEmpty()
  url:string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

 

  

}