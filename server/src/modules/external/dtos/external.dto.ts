import { IsNotEmpty } from 'class-validator';

export class ExternalDto{

  @IsNotEmpty()
  receiverAccountNumber:string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

}