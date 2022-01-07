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


  //useGaurd
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

  /**
   * Creates a trascation for the user who recieves an internal transfer
   * @param {TransactionDto} sender_dto The dto of the sender which contains his aid and transfer amount
   * @returns {Transaction} reciever_transaction the created transaction for the reciever
   */
  createRecieverTransaction(sender_dto: TransactionDto):Promise<Transaction>{
    const reciever_dto:TransactionDto = {from_To:(sender_dto).accountid.toString(),accountid:(sender_dto).from_To.toString(),amount:sender_dto.amount,credit:1,debit:0,Display_date:sender_dto.Display_date,description:(sender_dto).description.toString()}
    const reciever_transaction = this.createTransaction(reciever_dto);
    return reciever_transaction;
  }


  //method That gets the ngrok url given the authtoken
  //   async createExternalUrl( authtoken:String , port:Number ){
  //     const ngrok = require('ngrok');
  //     return await ngrok.connect({
  //       proto: 'tcp', // http|tcp|tls, defaults to http
  //       addr: port, // port or network address, defaults to 80
  //       authtoken: authtoken // other bank authtoken from ngrok.com
  //     });
  // }




}