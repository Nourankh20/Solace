import { Injectable, Options } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Account, AccountDocument,Transaction,} from "@sp/schemas";
import { Model } from "mongoose";
import { TransactionService } from "../transaction/transaction.service";
import { Response as Res, Request as Req } from "express";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private transactionService: TransactionService,
    private jwtService: JwtService
  ) {}

  //method that creates the external transaction
  async createExternalTransaction(authtoken:String , port:Number  ){
    const ngrok = require('ngrok');
    //authenticate the token
    const url = await ngrok.connect({
      proto: 'http', // http|tcp|tls, defaults to http
      addr: port, // port or network address, defaults to 80
      authtoken: authtoken // other bank authtoken from ngrok.com
    });
    // const api = ngrok.getApi();

    // axois.post(`${url}/external/transfer` , dto)

    // // api.post(`${url}/transactions` , dto); 
    // api.post(`/transactions`, dto)
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
