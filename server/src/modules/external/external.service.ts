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



//   //method that creates the external transaction
//   async createExternalTransaction(authtoken:string , port:number, receiverAccountNumber:string , amount:number , description:string ,accountid:string  ){
//     const ngrok = require('ngrok');
//     //authenticate the token
//     const url = await ngrok.connect({
//       proto: 'http', // http|tcp|tls, defaults to http
//       addr: port, // port or network address, defaults to 80
//       authtoken: authtoken // other bank authtoken from ngrok.com
//     });
//     const payload = {receiverAccountNumber , amount , description};
//     // const token =JwtService.sign(payload , {secret : "My-Secret-Key"});

//     axios.post(`${url}/external/transfer` ,payload).then(async(response) => {
//       console.log(response);
//       //create 2 transactions chec calculate balance method >= ammount + 5 then create the transactions
//       const Balance = await this.accountService.calculateBalance(accountid);
//       if(Balance >= amount+5){
//         let today = new Date();
//         const tdto:TransactionDto = {
//             from_To:"Bank",
//             accountid: accountid,
//             amount: amount,
//             credit:0,
//             debit:1,
//             Display_date:today.toDateString()
//             ,description:description
//         };
//         const newTransaction = await this.transactionService.createTransaction(tdto);
//         const tdto2:TransactionDto = {
//             from_To:"Bank",accountid: accountid,amount: 5,credit:0,debit:1,Display_date:today.toDateString(),description:description}
//         const newTransaction2 = await this.transactionService.createTransaction(tdto2);

//       }
//     }, (error) => {
//       console.log(error);
//     }) ;
    

//     await ngrok.disconnect(url); // stops one
//   }


    async createTransfer(dto: ExternalDto ){
        // check if accountid exist
        return this.accountService.findAccountbyAccountId((dto).receiverAccountNumber.toString())
        .then( async (account) => { 
                    if (account){
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
               throw new HttpException('account number not found"', HttpStatus.BAD_REQUEST);}
        );
        
     

   

 }
  
}
