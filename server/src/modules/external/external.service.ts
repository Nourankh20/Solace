import {  HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Account, AccountDocument,Transaction,} from "@sp/schemas";
import { Model } from "mongoose";
import { TransactionService } from "../transaction/transaction.service";
import { AccountService } from "../account/account.service";
import { Response as Res, Request as Req } from "express";
import { TransactionDto } from '../transaction/dto/transaction.dto';
import { JwtService } from "@nestjs/jwt";
// const JwtService = require("@nestjs/jwt")
import axios from 'axios';
import { ExternalDto } from "./dtos/external.dto";



@Injectable()

export class ExternalService {
  constructor(
    // @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}


  async CreateExternal(request:any){
 const today = new Date();
 const tdto:TransactionDto = {
  from_To:request.receiverAccountNumber,
  accountid: request.accountid,
  amount: request.amount,
  credit:0,
  debit:1,
  Display_date:today.toDateString()
  ,description:request.description
};
 const newTransaction = await this.transactionService.createTransaction(tdto);
 const tdto2:TransactionDto = {
     from_To:request.receiverAccountNumber,accountid: request.accountid,amount: 5,credit:0,debit:1,Display_date:today.toDateString(),description:request.description}
 const newTransaction2 = await this.transactionService.createTransaction(tdto2);
      

 
}


    async createTransfer(dto: ExternalDto ){
        // check if accountid exist
        return this.accountService.findAccountbyAccountId((dto).receiverAccountNumber.toString())
        .then( async (account) => { 
                    //if account exists resume else return error 400 "Bad_Request" with message of "account number not found"
                    if (account){
                        //checks if the amount is less than or equal 50 if yes resume and create a transaction else 400 "Bad_Request" with message of "amount exceeds 50"
                        if (dto.amount <= 50){
                            let today = new Date();
                            const tdto:TransactionDto = {
                                from_To:"External Bank",
                                accountid: dto.receiverAccountNumber.toString() ,
                                amount: dto.amount.valueOf(),
                                credit:1,
                                debit:0,
                                Display_date:today.toDateString(),
                                description:dto.description.toString()
                            }
                        return  await this.transactionService.createTransaction(tdto);
                        }
                   
                        else 
                            throw new HttpException('amount exceeds 50', HttpStatus.BAD_REQUEST);
                    }
                    throw new HttpException('account number not found', HttpStatus.BAD_REQUEST);}

                     
                    
                
        );  
     }
        
     

   

 }
  

