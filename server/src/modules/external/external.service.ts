import {  HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Account, AccountDocument,Transaction,} from "@sp/schemas";
import { Model } from "mongoose";
import { TransactionService } from "../transaction/transaction.service";
import { AccountService } from "../account/account.service";
import { Response as Res, Request as Req, response } from "express";
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

  CreateEtoken(dto:ExternalDto , res:any):any {

    const access_token = this.jwtService.sign(
    {
        receiverAccountNumber:dto.receiverAccountNumber,
         amount:dto.amount ,
         description:dto.description }, 
    {secret:"My-Secret-Key",
    expiresIn: "60s",
  });
  //console.log(access_token);
  let response: object = { ...{receiverAccountNumber:dto.receiverAccountNumber, amount:dto.amount ,description:dto.description }, token: access_token };
  res.json(response);
  return res;
} 
  async CreateExternal(request:any){
  const balance = this.accountService.calculateBalance(request.accountid);
  if(balance >= request.amount+5){
    let req: ExternalDto = {receiverAccountNumber:request.receiverAccountNumber,amount:request.amount,description:request.description};
    const token = await this.CreateEtoken(req,response);
    axios.post(`http://${request.url}/external/createtransfer`, req,{headers:{'Authorization':`${token}`,'Bypass-Tunnel-Reminder':"any"}})
    .then(async(response)=>{
      if(response){
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
    });

 
      

 

    }  
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
  

