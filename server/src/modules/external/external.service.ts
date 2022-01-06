import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// import { Account, AccountDocument,Transaction,} from "@sp/schemas";
import { Model } from "mongoose";
import { TransactionService } from "../transaction/transaction.service";


@Injectable()
export class AccountService {
  constructor(
    // @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    // private transactionService: TransactionService
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

  
}
