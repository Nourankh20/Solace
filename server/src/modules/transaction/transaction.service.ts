import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction,TransactionDocument } from '@sp/schemas';
import { Model, ObjectId } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import axios from 'axios';

@Injectable()
export class TransactionService {
  // TODO: Define your Transaction Service Logic

  //getTrancation(takes the accountId)
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

  /**
   * Returns all users from mongo database
   */

   async getTrancation(accountid:string): Promise<Transaction[]> {
    return await this.transactionModel.find({accountid:accountid}).exec();
   }


  async getAll():Promise<any>{
    return await this.transactionModel.find().exec(); 
   }

  
  createTransaction(dto: TransactionDto):Promise<Transaction>{     
    const newTransaction = new this.transactionModel(dto);
    return newTransaction.save();  
  }


  //method That gets the ngrok url given the authtoken
    async createExternalUrl( authtoken:String , port:Number ){
      const ngrok = require('ngrok');
      return await ngrok.connect({
        proto: 'tcp', // http|tcp|tls, defaults to http
        addr: port, // port or network address, defaults to 80
        authtoken: authtoken // other bank authtoken from ngrok.com
      });
  }


  //method that creates the external transaction
  createExternalTransaction(authtoken:String , port:Number , dto: TransactionDto ){
    const url = this.createExternalUrl(authtoken , port);
    axios.post(`${url}/transactions` , dto); 
  }
}