import { Injectable, Options } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Account, AccountDocument,Transaction,} from "@sp/schemas";

import { Model } from "mongoose";
import { TransactionService } from "../transaction/transaction.service";
import { AccountService } from "../account/account.service";

import { Response as Res, Request as Req } from "express";

import { TransactionDto } from '../transaction/dto/transaction.dto';
import { JwtService } from "@nestjs/jwt";

import axios from 'axios';



@Injectable()
export class ExternalService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  //method that creates the external transaction
  async createExternalTransaction(authtoken:string , port:number, receiverAccountNumber:string , amount:number , description:string ,accountid:string  ){
    const ngrok = require('ngrok');
    //authenticate the token
    const url = await ngrok.connect({
      proto: 'http', // http|tcp|tls, defaults to http
      addr: port, // port or network address, defaults to 80
      authtoken: authtoken // other bank authtoken from ngrok.com


    });
    const payload = {receiverAccountNumber , amount , description};
    const token = this.jwtService.sign(payload , {secret : "My-Secret-Key"});

    axios.post(`${url}/external/transfer` ,payload, { headers: {"Authorization" : `Bearer ${token}`} }).then(async(response) => {
      console.log(response);
      //create 2 transactions chec calculate balance method >= ammount + 5 then create the transactions
      const Balance = await this.accountService.calculateBalance(accountid);
      if(Balance >= amount+5){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        const tdto:TransactionDto = {from_To:"Bank",accountid: accountid,amount: amount,credit:0,debit:1,Display_date:today.toDateString(),description:description};
        const newTransaction = await this.transactionService.createTransaction(tdto);
        const tdto2:TransactionDto = {from_To:"Bank",accountid: accountid,amount: 5,credit:0,debit:1,Display_date:today.toDateString(),description:description}

        const newTransaction2 = await this.transactionService.createTransaction(tdto2);

      }
    }, (error) => {
      console.log(error);
    }) ;
    

    await ngrok.disconnect(url); // stops one
  }


    async createTransfer(res:Res , req:Req ){
        try{
            // Get user input
            const { receiverAccountNumber, amount, description} = req.body;

            // Validate user input
            if (!( receiverAccountNumber && amount && description)) {
            res.status(400).send("Bad Request");
            }
        
            // check if accountid exist
            const account = await this.accountModel.findOne({ accountid:receiverAccountNumber });

            if (!account) {
            return res.status(400).send("account number not found");
            }

            let token;
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') 
                token = req.headers.authorization.split(' ')[1];
            
            this.jwtService.verify(token ,{secret:"My-Secret-Key"}), (err) => {
            if(err)
                res.status(401).send("Unauthorized, invalid token")
            }
        }
        finally{
            // call transaction.service and create new transaction with the input (from_to: External transfer)
            // res.status(201).send("Transfer completed successfully")
        }
    
    
   

 }
  
}
